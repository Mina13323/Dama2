import type { Metadata } from "next";
import Link from "next/link";
import { AcceptInviteForm } from "@/components/forms/AcceptInviteForm";
import { Notice, btn } from "@/components/ui";
import { findUsableInvite } from "@/lib/invites";
import { roleDescription, roleLabel } from "@/lib/roles";

export const metadata: Metadata = { title: "Accept invitation" };

export default async function AcceptInvitePage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const token = (await searchParams).token ?? "";
  const invite = await findUsableInvite(token);
  return (
    <>
      <h1 className="font-display text-title-lg text-ink">Welcome to DAMA CMS</h1>
      {invite ? (
        <>
          <p className="mt-2 text-body-sm text-muted">
            Set up your account for <strong className="text-ink">{invite.email}</strong>. You are joining as{" "}
            <strong className="text-ink">{roleLabel[invite.role]}</strong>: {roleDescription[invite.role].toLowerCase()}
          </p>
          <div className="mt-8">
            <AcceptInviteForm token={token} />
          </div>
        </>
      ) : (
        <div className="mt-6 space-y-6">
          <Notice tone="error">This invitation link is invalid, has expired or was already used. Ask a DAMA CMS admin for a new one.</Notice>
          <Link href="/login" className={btn.secondary}>
            Go to sign in
          </Link>
        </div>
      )}
    </>
  );
}
