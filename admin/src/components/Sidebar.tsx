"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Role } from "@prisma/client";
import { Briefcase, Building2, History, LayoutDashboard, LogOut, Menu, Newspaper, UserRound, Users, X, type LucideIcon } from "lucide-react";
import { logout } from "@/actions/auth";
import { roleLabel } from "@/lib/roles";

type Item = { href: string; label: string; icon: LucideIcon; roles?: Role[]; soon?: string };

const NAV: { group: string; items: Item[] }[] = [
  { group: "", items: [{ href: "/", label: "Dashboard", icon: LayoutDashboard }] },
  {
    group: "Content",
    items: [
      { href: "/projects", label: "Projects", icon: Building2, soon: "Phase 2" },
      { href: "/news", label: "News", icon: Newspaper, soon: "Phase 4" },
      { href: "/careers", label: "Careers", icon: Briefcase, soon: "Phase 4" },
    ],
  },
  {
    group: "Administration",
    items: [
      { href: "/users", label: "Users & access", icon: Users, roles: ["ADMIN"] },
      { href: "/audit", label: "Activity log", icon: History, roles: ["ADMIN"] },
    ],
  },
  { group: "", items: [{ href: "/account", label: "My account", icon: UserRound }] },
];

export function Sidebar({ user }: { user: { name: string; email: string; role: Role } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Phone top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-white/90 px-5 py-3 backdrop-blur lg:hidden">
        <span className="font-display text-title-xs text-ink">DAMA CMS</span>
        <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="inline-flex size-10 items-center justify-center rounded-full border border-border">
          <Menu aria-hidden className="size-5" />
        </button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-ink/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-72 flex-col bg-charcoal text-white transition-transform lg:sticky lg:top-0 lg:h-svh lg:w-auto lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 pb-6 pt-7">
          <div>
            <p className="font-display text-title-xs tracking-wide">DAMA</p>
            <p className="text-micro font-semibold tracking-[0.22em] text-white/50 uppercase">Content studio</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-9 items-center justify-center rounded-full text-white/70 hover:text-white lg:hidden">
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 space-y-6 overflow-y-auto px-3">
          {NAV.map((g, i) => {
            const items = g.items.filter((it) => !it.roles || it.roles.includes(user.role));
            if (!items.length) return null;
            return (
              <div key={i}>
                {g.group && <p className="px-3 pb-2 text-micro font-semibold tracking-[0.2em] text-white/40 uppercase">{g.group}</p>}
                <ul className="space-y-1">
                  {items.map((it) => {
                    const Icon = it.icon;
                    if (it.soon) {
                      return (
                        <li key={it.href}>
                          <span className="flex min-h-10 cursor-not-allowed items-center gap-3 rounded-full px-3 text-small text-white/40" title={`Available in ${it.soon}`}>
                            <Icon aria-hidden className="size-4" />
                            {it.label}
                            <span className="ms-auto rounded-full bg-white/10 px-2 py-0.5 text-micro">{it.soon}</span>
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          onClick={() => setOpen(false)}
                          aria-current={active(it.href) ? "page" : undefined}
                          className="flex min-h-10 items-center gap-3 rounded-full px-3 text-small font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-red-primary aria-[current=page]:text-white"
                        >
                          <Icon aria-hidden className="size-4" />
                          {it.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="px-2">
            <p className="truncate text-small font-semibold">{user.name}</p>
            <p className="truncate text-caption text-white/55">{user.email}</p>
            <p className="mt-1.5 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-micro font-semibold">{roleLabel[user.role]}</p>
          </div>
          <form action={logout} className="mt-3">
            <button type="submit" className="flex min-h-10 w-full items-center gap-3 rounded-full px-3 text-small text-white/75 hover:bg-white/10 hover:text-white">
              <LogOut aria-hidden className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
