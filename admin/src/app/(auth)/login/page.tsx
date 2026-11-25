import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { getCurrentUser } from "@/lib/session";
import { safeNext } from "@/lib/request";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getCurrentUser()) redirect(next);
  return (
    <>
      <p className="font-display text-title text-ink lg:hidden">DAMA</p>
      <h1 className="mt-6 font-display text-title-lg text-ink lg:mt-0">Sign in</h1>
      <p className="mt-2 text-body-sm text-muted">Use the email and password from your DAMA invitation.</p>
      <div className="mt-8">
        <LoginForm next={next} />
      </div>
      <p className="mt-8 text-caption text-subtle">Forgot your password? Ask a DAMA CMS admin to send you a new invitation.</p>
    </>
  );
}
