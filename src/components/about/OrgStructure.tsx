import { ArrowDown, Landmark, UsersRound } from "lucide-react";
import type { Locale } from "@/content";

/**
 * Visual organisational framework. DAMA has not supplied official positions or
 * reporting lines, so only the two approved tiers are drawn; functional areas
 * are shown as clearly-labelled pending slots rather than invented departments.
 */
export function OrgStructure({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <section id="structure" aria-labelledby="structure-title" className="bg-[#FBFBFA] py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
              <span className="h-px w-4 bg-[#C51E28]" aria-hidden />
              {ar ? "الهيكل التنظيمي" : "Organisational Structure"}
            </p>
            <h2 id="structure-title" className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] leading-tight text-[#14171A]">
              {ar ? "إطار واضح للقيادة." : "A clear framework for leadership."}
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-[#687076]">
            {ar
              ? "يُعرض الهيكل العام فقط. سيتم نشر المناصب الرسمية وخطوط الإبلاغ والتفاصيل التنظيمية بعد اعتمادها من داما."
              : "The general framework is shown. Official positions, reporting lines and departmental detail will be published after DAMA approval."}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <div className="w-full max-w-md rounded-[24px] border border-[#ECEAE5] bg-white p-7 text-center shadow-sm">
            <Landmark aria-hidden strokeWidth={1.5} className="mx-auto size-6 text-[#C51E28]" />
            <h3 className="mt-3 font-display text-2xl text-[#14171A]">{ar ? "مجلس الإدارة" : "Board of Directors"}</h3>
            <p className="mt-1.5 text-[12.5px] text-[#687076]">
              {ar ? "الأسماء والمناصب قيد الاعتماد" : "Names and titles pending approval"}
            </p>
          </div>

          <div className="my-3 flex h-10 flex-col items-center justify-center text-[#C51E28]" aria-hidden>
            <span className="h-6 w-px bg-[#C51E28]/50" />
            <ArrowDown className="size-4" />
          </div>

          <div className="w-full max-w-md rounded-[24px] border border-[#ECEAE5] bg-white p-7 text-center shadow-sm">
            <UsersRound aria-hidden strokeWidth={1.5} className="mx-auto size-6 text-[#C51E28]" />
            <h3 className="mt-3 font-display text-2xl text-[#14171A]">{ar ? "الإدارة التنفيذية" : "Executive Management"}</h3>
            <p className="mt-1.5 text-[12.5px] text-[#687076]">
              {ar ? "الهيكل التنفيذي قيد الاعتماد" : "Executive structure pending approval"}
            </p>
          </div>

          <div className="my-3 h-10 w-px bg-[#C51E28]/30" aria-hidden />

          <ul className="grid w-full gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i} className="rounded-[18px] border border-dashed border-[#ECEAE5] bg-[#F7F6F3] px-5 py-6 text-center">
                <span className="text-[10px] font-bold tracking-[0.24em] text-[#C51E28] uppercase rtl:tracking-normal">
                  {ar ? `وظيفة ${i + 1}` : `Function 0${i + 1}`}
                </span>
                <p className="mt-2 text-[13px] font-medium text-[#14171A]">
                  {ar ? "التفاصيل قيد الاعتماد" : "Details pending approval"}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11.5px] text-[#8C939B]">
            {ar ? "لا ننشر أسماءً أو مناصب أو علاقات إبلاغ غير معتمدة." : "No unapproved names, positions or reporting relationships are published."}
          </p>
        </div>
      </div>
    </section>
  );
}
