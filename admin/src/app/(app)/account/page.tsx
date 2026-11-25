import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { roleDescription, roleLabel } from "@/lib/roles";
import { Badge, Card, PageTitle, formatDateTime } from "@/components/ui";
import { PasswordForm } from "@/components/forms/PasswordForm";

export const metadata: Metadata = { title: "My account" };

export default async function AccountPage() {
  const me = await requireUser();
  return (
    <>
      <PageTitle eyebrow="My account" title={me.name} description={me.email} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.618fr]">
        <Card title="Access">
          <Badge tone="dark">{roleLabel[me.role]}</Badge>
          <p className="mt-3 text-small text-muted">{roleDescription[me.role]}</p>
          <p className="mt-4 text-caption text-subtle">Last sign-in: {formatDateTime(me.lastLoginAt)}</p>
          <p className="mt-4 text-caption text-subtle">To change your role or email, ask a DAMA CMS admin.</p>
        </Card>
        <Card title="Change password" description="Changing it signs you out on your other devices.">
          <PasswordForm />
        </Card>
      </div>
    </>
  );
}
