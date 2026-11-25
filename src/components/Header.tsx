"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Globe, House, Menu, ShoppingBag, X } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { href, type ProjectMenu } from "@/lib/routes";
import { Logo } from "./ui";
import { MenuVideo } from "./navigation/MenuVideo";
import { buttonClass } from "@/components/ui";

/** `menu` is built on the server from the project registry (content/projects/menu); the first project is featured. */
export function Header({ dict, locale, menu }: { dict: Dictionary; locale: Locale; menu: ProjectMenu }) {
  const featured = menu[0];
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
  const M = dict.nav.mega;
  const isHome = pathname === base;
  const overHero = isHome || pathname === `${base}/about` || pathname.startsWith(`${base}/developments`);
  const solid = scrolled || !overHero || menuOpen;

  const inDevelopments = pathname.startsWith(`${base}/developments`);
  const links = [
    { href: href("home", locale), label: dict.nav.home, active: isHome },
    { href: href("about", locale), label: dict.nav.about, active: pathname === href("about", locale) },
    { href: href("developments", locale), label: dict.nav.projects, active: inDevelopments },
    { href: href("news", locale), label: dict.nav.news, active: pathname.startsWith(href("news", locale)) },
    { href: href("contact", locale), label: dict.nav.contact, active: pathname === href("contact", locale) },
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
          solid ? "bg-white/95 py-3 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md" : "py-5 lg:py-6"
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
                  className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-small font-medium whitespace-nowrap transition-colors hover:text-red-primary xl:text-small ${
                    menuOpen ? "bg-red-primary/[0.07] text-red-primary" : inDevelopments ? "font-semibold text-ink" : "text-ink/70"
                  }`}
                >
                  {(menuOpen || inDevelopments) && (
                    <span aria-hidden className="absolute -bottom-0.5 start-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-red-primary rtl:translate-x-1/2" />
                  )}
                  {dict.nav.projects}
                  <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                <div
                  id={menuId}
                  hidden={!menuOpen}
                  className="fixed inset-x-0 top-[56px] z-50 px-4 pt-7 sm:px-8"
                >
                  <div className="relative mx-auto w-full max-w-[1240px] overflow-hidden rounded-card border border-border bg-cream px-10 pb-10 pt-8 shadow-lift xl:px-14">
                    {/* faint lattice in the corner, echoing Rawasin's patterned screens */}
                    <svg aria-hidden viewBox="0 0 120 80" className="pointer-events-none absolute bottom-0 start-0 h-28 w-auto text-[#E9E4DD] rtl:scale-x-[-1]">
                      {[0, 1, 2, 3, 4, 5].map((x) => [0, 1, 2].map((y) => (
                        <path key={`${x}-${y}`} d={`M${x * 20 + (y % 2) * 10} ${80 - y * 18}l10-10 10 10-10 10z`} fill="currentColor" opacity={1 - (x + y) * 0.12} />
                      )))}
                    </svg>

                    <div className="flex justify-end">
                      <Link data-menu-link href={href("developments", locale)} onClick={() => setMenuOpen(false)} className="group inline-flex items-center gap-2 border-b border-border pb-3 ps-16 text-small font-semibold text-ink hover:text-red-primary">
                        {dict.nav.allProjects}
                        <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                      </Link>
                    </div>

                    <div className="relative mt-2 grid grid-cols-[1fr_auto_1.5fr_1.15fr] items-center gap-10">
                      <div>
                        <p className="flex items-center gap-2 text-caption font-bold tracking-[0.18em] text-red-primary uppercase rtl:tracking-normal">
                          <span aria-hidden className="h-[2px] w-3 bg-red-primary" />
                          {M.eyebrow}
                        </p>
                        <p className="mt-4 font-display text-[clamp(2.4rem,3.4vw,3.4rem)] leading-none text-ink">{M.title}</p>
                        <p className="mt-5 text-body-sm leading-[1.75] text-muted">{M.body}</p>
                        <Link data-menu-link href={featured?.href ?? href("developments", locale)} onClick={() => setMenuOpen(false)} className={`${buttonClass("red", "sm")} mt-7`}>
                          {M.cta}
                          <ArrowRight aria-hidden className="flip-rtl size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                        </Link>
                      </div>

                      <span aria-hidden className="h-full min-h-56 w-px bg-ink/10" />

                      <MenuVideo active={menuOpen} labels={{ play: M.play, pause: M.pause, fullscreen: M.fullscreen }} />

                      <div>
                        <p className="text-caption font-bold tracking-[0.18em] text-red-primary uppercase rtl:tracking-normal">{M.tag}</p>
                        <p className="mt-3 font-display text-[clamp(1.5rem,2vw,2rem)] leading-tight text-ink">{M.headline}</p>
                        <p className="mt-4 text-body-sm leading-[1.75] text-muted">{M.description}</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          {(featured?.branches ?? []).map((b) => [b.id, b.category === "residential" ? House : ShoppingBag, b.category === "residential" ? M.residential : M.commercial, b.href] as const).map(([key, Icon, label, to]) => (
                            <Link
                              key={key}
                              data-menu-link
                              href={to}
                              onClick={() => setMenuOpen(false)}
                              aria-current={pathname === to ? "page" : undefined}
                              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-red-primary/[0.07] px-5 text-body-sm font-medium text-ink transition-colors hover:bg-red-primary hover:text-white aria-[current=page]:bg-red-primary aria-[current=page]:text-white"
                            >
                              <Icon aria-hidden className="size-[18px]" strokeWidth={1.6} />
                              {label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
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
              "hidden items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-caption text-ink/80 backdrop-blur transition-colors hover:border-red-primary/50 hover:text-red-primary sm:inline-flex",
            )}

            <Link
              href={href("contact", locale)}
              className="group hidden min-h-11 items-center gap-3 whitespace-nowrap rounded-full bg-[#16191C] py-1.5 ps-5 pe-1.5 text-small font-medium text-white shadow-soft transition-all duration-200 hover:bg-[#23292F] md:inline-flex"
            >
              <span>{dict.getInTouch}</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-primary text-white transition-transform duration-200 group-hover:scale-105">
                <ArrowRight aria-hidden className="flip-rtl size-4" />
              </span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-ink backdrop-blur lg:hidden"
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
        className="fixed inset-0 z-[70] flex flex-col bg-canvas lg:hidden"
      >
        <div className="frame-wide flex items-center justify-between border-b border-border py-5">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.a11y.closeMenu}
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-ink hover:border-red-primary hover:text-red-primary"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <nav aria-label={dict.a11y.primaryNav} className="frame-wide mt-5 flex-1 overflow-y-auto">
          <ul className="divide-y divide-border border-y border-border">
            {links.map((l, i) => (
              <li key={l.href}>
                <div className="flex items-center">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={l.active ? "page" : undefined}
                    className="flex min-h-14 flex-1 items-center justify-between py-3 font-display text-2xl text-ink aria-[current=page]:text-red-primary"
                  >
                    {l.label}
                    <ArrowRight aria-hidden className="flip-rtl size-5 text-subtle" />
                  </Link>
                  {i === 2 && (
                    <button
                      type="button"
                      aria-label={dict.a11y.projectsMenu}
                      aria-expanded={mobileProjects}
                      onClick={() => setMobileProjects((v) => !v)}
                      className="ms-3 inline-flex size-10 items-center justify-center rounded-full border border-border bg-white text-ink"
                    >
                      <ChevronDown aria-hidden className={`size-4 transition-transform ${mobileProjects ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {i === 2 && mobileProjects && (
                  <div className="pb-4 ps-3">
                    {menu.map((project) => (
                    <div key={project.slug}>
                    <Link
                      href={project.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center py-1.5 font-display text-lead tracking-wide text-ink"
                    >
                      {project.name.toUpperCase()}
                    </Link>
                    {project.branches.map((branch) => (
                      <div key={branch.id} className="mt-2">
                        <p className="text-micro font-bold tracking-[0.24em] text-red-primary uppercase rtl:tracking-normal">{branch.label}</p>
                        <ul className="mt-1 ps-3">
                          {branch.links.map((leaf) => (
                            <li key={leaf.href}>
                              <Link
                                href={leaf.href}
                                onClick={() => setOpen(false)}
                                className="flex min-h-11 items-center gap-2 py-1.5 text-body-sm text-muted hover:text-red-primary"
                              >
                                <span className="size-1.5 rounded-full bg-red-primary" aria-hidden />
                                {leaf.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-small font-semibold tracking-wider text-muted uppercase">{dict.a11y.language}</span>
            {languageSwitcher(
              "inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-small text-ink",
            )}
          </div>
        </nav>

        <div className="frame-wide pb-8 pt-5">
          <Link
            href={href("contact", locale)}
            onClick={() => setOpen(false)}
            className={`${buttonClass("red", "sm")} w-full flex`}
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
        className="group relative block rounded-full px-3.5 py-2 text-small font-medium whitespace-nowrap text-ink/70 transition-colors hover:text-red-primary aria-[current=page]:font-semibold aria-[current=page]:text-ink xl:text-small"
      >
        {link.active && (
          <span
            aria-hidden
            className="absolute -bottom-0.5 start-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-red-primary rtl:translate-x-1/2"
          />
        )}
        {link.label}
      </Link>
    </li>
  );
}
