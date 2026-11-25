import type { Metadata } from "next";
import { CircleCheck, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { describeAction } from "@/lib/audit-labels";
import { Card, Notice, PageTitle, formatDateTime } from "@/components/ui";

export const metadata: Metadata = { title: "Dashboard" };

const ROADMAP = [
  { phase: "Phase 1", title: "Access", body: "Sign-in, roles, invitations and the activity log.", done: true },
  { phase: "Phase 2", title: "Projects", body: "Project details in English and Arabic, facts, apartment types, images and page chapters.", done: false },
  { phase: "Phase 3", title: "Publishing", body: "Publish to the client preview and track each website build.", done: false },
  { phase: "Phase 4", title: "News & careers", body: "News articles and job openings.", done: false },
  { phase: "Phase 5", title: "Rawasin", body: "Rawasin's content and images imported for editing.", done: false },
  { phase: "Phase 6", title: "Go live", body: "Publishing to the live site on Hostinger.", done: false },
];

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const denied = (await searchParams).denied;
  const recent = await prisma.auditLog.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 8 });

  return (
    <>
      <PageTitle eyebrow="DAMA CMS" title={`Welcome, ${user.name.split(" ")[0]}`} description="Manage DAMA's projects, news and careers. Content sections open as each phase is delivered." />
      {denied && (
        <div className="mb-6">
          <Notice tone="error">Your role does not have access to that page.</Notice>
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.618fr_1fr]">
        <Card title="Roadmap" description="What the CMS can do now, and what comes next.">
          <ol className="grid gap-3 sm:grid-cols-2">
            {ROADMAP.map((r) => (
              <li key={r.phase} className={`rounded-tile border p-4 ${r.done ? "border-emerald-200 bg-emerald-50/60" : "border-border bg-canvas"}`}>
                <p className="flex items-center gap-2 text-caption font-semibold text-subtle">
                  {r.done ? <CircleCheck aria-hidden className="size-4 text-emerald-600" /> : <Clock aria-hidden className="size-4" />}
                  {r.phase} · {r.done ? "Ready" : "Planned"}
                </p>
                <p className="mt-1.5 font-semibold text-ink">{r.title}</p>
                <p className="mt-1 text-small text-muted">{r.body}</p>
              </li>
            ))}
          </ol>
        </Card>
        <Card title="Your recent activity">
          {recent.length === 0 ? (
            <p className="text-small text-muted">Nothing yet.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((a) => (
                <li key={a.id.toString()} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <span className="text-small text-ink">{describeAction(a.action)}</span>
                  <span className="shrink-0 text-caption text-subtle">{formatDateTime(a.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
