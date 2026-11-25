import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { describeAction } from "@/lib/audit-labels";
import { Card, PageTitle, btn, formatDateTime } from "@/components/ui";

export const metadata: Metadata = { title: "Activity log" };

const PAGE_SIZE = 50;

/** Readable summary of an entry's details (email, role change, …). */
function details(meta: unknown): string {
  if (!meta || typeof meta !== "object") return "";
  const m = meta as Record<string, unknown>;
  const parts: string[] = [];
  if (m.email) parts.push(String(m.email));
  if (m.from && m.to) parts.push(`${String(m.from).toLowerCase()} → ${String(m.to).toLowerCase()}`);
  else if (m.role) parts.push(String(m.role).toLowerCase());
  if (m.reason) parts.push(String(m.reason).replace(/_/g, " "));
  return parts.join(" · ");
}

export default async function AuditPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireUser(["ADMIN"]);
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const [entries, total] = await Promise.all([
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, include: { user: { select: { name: true, email: true } } } }),
    prisma.auditLog.count(),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <PageTitle eyebrow="Administration" title="Activity log" description="Every sign-in and access change, newest first. Entries cannot be edited or deleted from the CMS." />
      <Card>
        <div className="-mx-2 overflow-x-auto">
          <table className="w-full min-w-[720px] text-small">
            <thead>
              <tr className="border-b border-border text-caption text-subtle">
                <th className="px-2 py-2 text-start font-semibold">When (Cairo)</th>
                <th className="px-2 py-2 text-start font-semibold">Who</th>
                <th className="px-2 py-2 text-start font-semibold">What</th>
                <th className="px-2 py-2 text-start font-semibold">Details</th>
                <th className="px-2 py-2 text-start font-semibold">IP</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id.toString()} className="border-b border-border last:border-0">
                  <td className="whitespace-nowrap px-2 py-2.5 text-muted">{formatDateTime(e.createdAt)}</td>
                  <td className="px-2 py-2.5">{e.user ? e.user.name : <span className="text-subtle">—</span>}</td>
                  <td className={`px-2 py-2.5 ${e.action.includes("failed") || e.action.includes("blocked") ? "text-red-primary" : "text-ink"}`}>{describeAction(e.action)}</td>
                  <td className="px-2 py-2.5 text-muted">{details(e.meta)}</td>
                  <td className="px-2 py-2.5 font-mono text-caption text-subtle">{e.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <nav aria-label="Pages" className="mt-6 flex items-center justify-between">
            {page > 1 ? <Link href={`/audit?page=${page - 1}`} className={btn.secondary}>Newer</Link> : <span />}
            <span className="text-caption text-subtle">
              Page {page} of {pages}
            </span>
            {page < pages ? <Link href={`/audit?page=${page + 1}`} className={btn.secondary}>Older</Link> : <span />}
          </nav>
        )}
      </Card>
    </>
  );
}
