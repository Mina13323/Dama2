import Link from "next/link";
import Image from "next/image";
import { FileText, Phone, ShieldCheck } from "lucide-react";
import type { Dictionary, Locale } from "@/content";
import { footerGroups, href, leafLabel, type ProjectMenu } from "@/lib/routes";
import { contact, contactVerified, social, socialVerified } from "@/content/site";
import { Logo } from "./ui";
import { Accent, stagger } from "./motion/Lines";
import { res } from "@/content/assets";

const socialIcons: Record<string, string> = {
  Instagram:
    "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.1-3.3.2-5 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.3 1.9 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.3-.2 5-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.3-1.9-5-5.2-5.2C14.7 3 14.4 3 12 3Z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.8-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z",
  YouTube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  Facebook:
    "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.24-1.45 1.48-1.45H16.5V4.47A20 20 0 0 0 14.2 4.4c-2.28 0-3.84 1.39-3.84 3.95v2.15H7.8v3h2.56V21h3.14Z",
};

const contactIcons: Record<string, typeof Phone> = { contact: Phone, privacy: FileText, terms: ShieldCheck };

export function Footer({ dict, locale, menu }: { dict: Dictionary; locale: Locale; menu: ProjectMenu }) {
  const t = dict.footer;
  // Company, then one group per project branch (from the registry), then Contact.
  const corporate = (id: "company" | "contact") => {
    const g = footerGroups.find((x) => x.id === id)!;
    return { id, title: g.title[locale], links: g.links.map((l) => ({ id: l.key as string, href: href(l.key, locale), label: leafLabel(l, locale) })) };
  };
  const groups = [
    corporate("company"),
    // With several projects, name the project too ("Rawasin · Residential") so columns stay distinct.
    ...menu.flatMap((p) => p.branches.map((b) => ({ id: `${p.slug}-${b.id}`, title: menu.length > 1 && !b.label.includes(p.name) ? `${p.name} · ${b.label}` : b.label, links: b.links.map((l) => ({ id: l.href, href: l.href, label: l.label })) }))),
    corporate("contact"),
  ];
  const year = new Date().getFullYear();
  const socials = socialVerified ? social.filter((s) => s.href) : [];
  const building = res(locale).screenPassage;

  const linkCls = "inline-flex min-h-9 items-center text-body-sm text-white/80 transition-colors hover:text-[#E0434C]";

  return (
    <footer className="relative isolate overflow-hidden bg-charcoal text-white">
      {/* Stone façade with a patterned screen, framed by a large arc on the trailing edge */}
      <div aria-hidden className="pointer-events-none absolute end-0 top-10 -z-10 hidden h-[78%] w-[19%] overflow-hidden rounded-ss-[100%] border-s border-t border-white/10 lg:block rtl:rounded-ss-none rtl:rounded-se-[100%] rtl:border-e rtl:border-s-0">
        <Image src={building.src} alt="" fill sizes="20vw" className="object-cover object-[60%_center] opacity-90 [mask-image:linear-gradient(to_top,transparent,black_35%)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -end-[6%] -top-[30%] -z-10 hidden aspect-square w-[34vw] rounded-full border border-white/[0.06] lg:block" />

      <div className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-16 sm:px-8 lg:px-14 lg:pb-12 lg:pt-20">
        <Link href={href("home", locale)} aria-label={dict.a11y.home} className="inline-block">
          <Logo tone="light" />
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_auto_minmax(0,2.4fr)] lg:gap-14 lg:pe-[18%]">
          {/* Brand statement */}
          <div data-reveal="up" style={stagger(0)}>
            <p className="font-display text-[clamp(2rem,2.8vw,2.9rem)] leading-[1.12] text-white">
              {t.titleLines.map((line) => (
                <span key={line} className="block">
                  <Accent text={line} />
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-md text-body-sm leading-[1.75] text-white/75">{t.description}</p>

            {socials.length > 0 && (
              <ul className="mt-8 flex gap-4" aria-label={t.follow}>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex size-12 items-center justify-center rounded-full border border-white/60 text-white transition-all duration-200 hover:border-red-primary hover:bg-red-primary"
                    >
                      <svg aria-hidden viewBox="0 0 24 24" className="size-5 fill-current">
                        <path d={socialIcons[s.label] || ""} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <span aria-hidden className="hidden w-px bg-white/15 lg:block" />

          {/* Link groups: Company / Residential / Commercial / Contact */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
            {groups.map((g, i) => (
              <nav key={g.id} data-reveal="up" style={stagger(1 + i)} aria-label={g.title}>
                <h3 className="text-small font-bold tracking-[0.12em] text-white uppercase rtl:tracking-normal">{g.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {g.links.map((l) => {
                    const Icon = g.id === "contact" ? contactIcons[l.id as keyof typeof contactIcons] : undefined;
                    return (
                      <li key={l.id}>
                        <Link href={l.href} className={`${linkCls} ${Icon ? "gap-3" : ""}`}>
                          {Icon && <Icon aria-hidden className="size-5 shrink-0 text-white/80" strokeWidth={1.4} />}
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {g.id === "contact" && contactVerified && (
                  <ul className="mt-5 space-y-3 text-body-sm text-white/70">
                    {contact.phone && (
                      <li><a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-white">{contact.phone}</a></li>
                    )}
                    {contact.email && (
                      <li><a href={`mailto:${contact.email}`} dir="ltr" className="hover:text-white">{contact.email}</a></li>
                    )}
                  </ul>
                )}
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-body-sm text-white/70 sm:flex-row sm:items-center lg:mt-24">
          <p>© {year} {t.rights}</p>
          <p className="flex items-center gap-3 text-small font-bold tracking-[0.24em] text-white uppercase rtl:tracking-normal">
            <span aria-hidden className="h-0.5 w-5 bg-red-primary" />
            {t.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
