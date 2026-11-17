"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { getProjects } from "@/content/projects";
import { Logo } from "./ui";

const allProjects = getProjects();

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const rawPathname = usePathname() ?? `/${locale}`;
  const pathname = rawPathname.replace(/\/$/, "") || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [menuOpen, setMenuOpen] = useState(false); // desktop mega-menu
  const [mobileProjects, setMobileProjects] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLLIElement>(null);
  const menuId = useId();

  const base = `/${locale}`;
  const isHome = pathname === base;
  const overHero = isHome || pathname === `${base}/about` || pathname.startsWith(`${base}/projects`);
  const solid = scrolled || !overHero;
  const ar = locale === "ar";

  const links = [
    { href: base, label: dict.nav.home, active: isHome },
    { href: `${base}/about`, label: dict.nav.about, active: pathname === `${base}/about` },
    { href: `${base}/projects`, label: dict.nav.projects, active: pathname.startsWith(`${base}/projects`) },
    { href: `${base}/news`, label: dict.nav.news, active: pathname.startsWith(`${base}/news`) },
    { href: `${base}/contact`, label: dict.nav.contact, active: pathname === `${base}/contact` },
  ];

  const otherLocale = locale === "en" ? "ar" : "en";
  const switchHref = pathname.replace(/^\/(en|ar)/, `/${otherLocale}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
    setMobileProjects(false);
  }, [pathname]);

  // Close the mega-menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const languageSwitcher = (className = "") => (
    <Link
      href={switchHref}
      hrefLang={otherLocale}
      lang={otherLocale}
      aria-label={dict.a11y.switchLang}
      className={className}
    >
      <Globe aria-hidden className="size-3.5" />
      <span className="font-semibold">{locale.toUpperCase()}</span>
      <span aria-hidden className="opacity-40">/</span>
      <span className="opacity-60">{otherLocale.toUpperCase()}</span>
    </Link>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {dict.a11y.skip}
      </a>
      <header
        className={`enter-fade fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-soft ${
          solid ? "bg-white/95 py-3 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "py-5 lg:py-6"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-8 lg:px-10 xl:px-12">
          <Link href={base} aria-label={dict.a11y.home} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label={dict.a11y.mainNavigation} className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {links.slice(0, 2).map((l) => (
                <DesktopLink key={l.href} link={l} />
              ))}

              {/* Our Developments — accessible mega-menu */}
              <li
                ref={menuRef}
                className="relative"
                onPointerEnter={() => setMenuOpen(true)}
                onPointerLeave={() => setMenuOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => setMenuOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setMenuOpen(true);
                      window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("[data-menu-link]")?.focus(), 0);
                    }
                  }}
                  className={`group flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium whitespace-nowrap transition-colors hover:text-[#C51E28] xl:text-[12.5px] ${
                    pathname.startsWith(`${base}/projects`) ? "font-semibold text-[#14171A]" : "text-[#14171A]/70"
                  }`}
                >
                  {dict.nav.projects}
                  <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  id={menuId}
                  hidden={!menuOpen}
                  className="absolute start-1/2 top-full z-50 w-[min(740px,80vw)] -translate-x-1/2 pt-4 rtl:start-1/2"
                >
                  <div className="rounded-[26px] border border-[#ECEAE5] bg-white p-5 shadow-[0_30px_70px_-30px_rgba(20,23,26,0.4)]">
                    <div className="flex items-center justify-between gap-4 px-1 pb-3">
                      <p className="text-[10.5px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
                        {dict.nav.allProjects}
                      </p>
                      <Link
                        data-menu-link
                        href={`${base}/projects`}
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#14171A] hover:text-[#C51E28]"
                      >
                        {ar ? "عرض الكل" : "View all"}
                        <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                      </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-3">
                      {allProjects.map((p) => (
                        <li key={p.slug}>
                          <Link
                            data-menu-link
                            href={`${base}/projects/${p.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="group block overflow-hidden rounded-[18px] border border-[#ECEAE5] bg-[#FBFBFA] transition-all hover:border-[#C51E28]/50 hover:shadow-md"
                          >
                            <span className="relative block aspect-[16/10] overflow-hidden">
                              <Image src={p.image} alt="" fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </span>
                            <span className="block px-3 py-3">
                              <span className="block font-display text-[17px] text-[#14171A]" dir="ltr">{p.name}</span>
                              <span className="mt-0.5 block text-[11px] text-[#687076]">{p.copy[locale].location}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      data-menu-link
                      href={`${base}/projects/rawasin/mall`}
                      onClick={() => setMenuOpen(false)}
                      className="mt-4 flex items-center justify-between gap-4 rounded-[16px] bg-[#111417] px-4 py-3 text-white transition-colors hover:bg-[#262B30]"
                    >
                      <span className="text-[12.5px] font-semibold">{dict.nav.rawasinMall}</span>
                      <span className="flex items-center gap-2 text-[11px] text-white/70">
                        {ar ? "استكشف الوجهة" : "Explore the destination"}
                        <ArrowRight aria-hidden className="flip-rtl size-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </li>

              {links.slice(3).map((l) => (
                <DesktopLink key={l.href} link={l} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {languageSwitcher(
              "hidden items-center gap-1.5 rounded-full border border-[#14171A]/10 bg-white/70 px-3 py-2 text-[11.5px] text-[#14171A]/80 backdrop-blur transition-colors hover:border-[#C51E28]/50 hover:text-[#C51E28] sm:inline-flex",
            )}

            <Link
              href={`${base}/contact`}
              className="group hidden min-h-11 items-center gap-3 whitespace-nowrap rounded-full bg-[#16191C] py-1.5 ps-5 pe-1.5 text-[12.5px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(20,23,26,0.45)] transition-all duration-200 hover:bg-[#23292F] md:inline-flex"
            >
              <span>{dict.getInTouch}</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#C51E28] text-white transition-transform duration-200 group-hover:scale-105">
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[#14171A] backdrop-blur lg:hidden"
              aria-label={dict.a11y.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={dict.a11y.primaryNav}
        hidden={!open}
        className="fixed inset-0 z-[70] flex flex-col bg-[#FBFBFA] lg:hidden"
      >
        <div className="container-x flex items-center justify-between border-b border-[#ECEAE5] py-5">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.a11y.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#ECEAE5] bg-white text-[#14171A] hover:border-[#C51E28] hover:text-[#C51E28]"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <nav aria-label={dict.a11y.primaryNav} className="container-x mt-5 flex-1 overflow-y-auto">
          <ul className="divide-y divide-[#ECEAE5] border-y border-[#ECEAE5]">
            {links.map((l, i) => (
              <li key={l.href}>
                <div className="flex items-center">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={l.active ? "page" : undefined}
                    className="flex min-h-14 flex-1 items-center justify-between py-3 font-display text-2xl text-[#14171A] aria-[current=page]:text-[#C51E28]"
                  >
                    {l.label}
                    <ArrowRight aria-hidden className="flip-rtl size-5 text-[#8C939B]" />
                  </Link>
                  {i === 2 && (
                    <button
                      type="button"
                      aria-label={dict.a11y.projectsMenu}
                      aria-expanded={mobileProjects}
                      onClick={() => setMobileProjects((v) => !v)}
                      className="ms-3 inline-flex size-10 items-center justify-center rounded-full border border-[#ECEAE5] bg-white text-[#14171A]"
                    >
                      <ChevronDown aria-hidden className={`size-4 transition-transform ${mobileProjects ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {i === 2 && mobileProjects && (
                  <ul className="pb-4 ps-3">
                    {allProjects.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`${base}/projects/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex min-h-11 items-center gap-2 py-1.5 text-[15px] text-[#687076] hover:text-[#C51E28]"
                        >
                          <span className="size-1.5 rounded-full bg-[#C51E28]" aria-hidden />
                          {p.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`${base}/projects/rawasin/mall`}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center gap-2 py-1.5 text-[15px] font-semibold text-[#C51E28]"
                      >
                        <span className="size-1.5 rounded-full bg-[#C51E28]" aria-hidden />
                        {dict.nav.rawasinMall}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-[12px] font-semibold tracking-wider text-[#687076] uppercase">{dict.a11y.language}</span>
            {languageSwitcher(
              "inline-flex items-center gap-1.5 rounded-full border border-[#ECEAE5] bg-white px-4 py-2 text-[12px] text-[#14171A]",
            )}
          </div>
        </nav>

        <div className="container-x pb-8 pt-5">
          <Link
            href={`${base}/contact`}
            onClick={() => setOpen(false)}
            className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#C51E28] text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#9F121A]"
          >
            {dict.getInTouch}
            <ArrowRight aria-hidden className="flip-rtl size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

function DesktopLink({ link }: { link: { href: string; label: string; active: boolean } }) {
  return (
    <li>
      <Link
        href={link.href}
        aria-current={link.active ? "page" : undefined}
        className="group relative block rounded-full px-3.5 py-2 text-[12px] font-medium whitespace-nowrap text-[#14171A]/70 transition-colors hover:text-[#C51E28] aria-[current=page]:font-semibold aria-[current=page]:text-[#14171A] xl:text-[12.5px]"
      >
        {link.active && (
          <span
            aria-hidden
            className="absolute -bottom-0.5 start-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#C51E28] rtl:translate-x-1/2"
          />
        )}
        {link.label}
      </Link>
    </li>
  );
}
