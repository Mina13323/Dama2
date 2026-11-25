import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { requireUser } from "@/lib/session";

/** Every page in here requires a signed-in, active user (checked against the database). */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();
  return (
    <div className="min-h-svh lg:grid lg:grid-cols-[17rem_1fr]">
      <Sidebar user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
