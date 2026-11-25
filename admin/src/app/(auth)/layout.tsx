import type { ReactNode } from "react";

/** Sign-in and invitation pages: brand panel beside a single card. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-svh lg:grid-cols-[1fr_1.618fr]">
      <aside className="relative hidden overflow-hidden bg-charcoal p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden className="absolute -end-24 top-1/3 size-[28rem] rounded-full bg-gradient-to-br from-red-primary to-red-dark opacity-90" />
        <div aria-hidden className="absolute -bottom-32 -start-20 size-[22rem] rounded-full border border-white/10" />
        <p className="relative font-display text-title tracking-wide">DAMA</p>
        <div className="relative">
          <p className="text-micro font-semibold tracking-[0.24em] text-white/70 uppercase">Content studio</p>
          <p className="mt-4 max-w-sm font-display text-[2.6rem] leading-[1.05]">
            Projects, news and careers, <span className="italic text-[#ffd6d9]">in one place</span>
          </p>
        </div>
        <p className="relative text-caption text-white/50">Authorised DAMA staff only. Activity is logged.</p>
      </aside>
      <div className="flex items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
