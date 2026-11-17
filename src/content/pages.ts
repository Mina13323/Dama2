/**
 * Localised copy for the newly added corporate / lifestyle sections.
 * Kept in its own module so the main EN/AR dictionaries stay stable.
 *
 * Proposed headlines are draft marketing copy (B/C category) and are listed
 * for DAMA's brand approval in docs/IMPLEMENTATION.md. Factual statements are
 * source-based (A category) or explicitly marked as pending (B category).
 */
import type { Locale } from "./index";

export interface LivingCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; titleLines: string[]; body: string };
  intro: { eyebrow: string; titleLines: string[]; body: string };
  categories: { title: string; items: { title: string; body: string; related: string }[] };
  example: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    items: string[];
    cta: string;
    note: string;
  };
  cta: { eyebrow: string; titleLines: string[]; body: string; button: string };
}

export interface ImpactCopy {
  meta: { title: string; description: string };
  hero: { eyebrow: string; titleLines: string[]; body: string };
  status: { eyebrow: string; titleLines: string[]; body: string; note: string };
  framework: { eyebrow: string; titleLines: string[]; items: { title: string; body: string }[] };
  cta: { eyebrow: string; titleLines: string[]; body: string; button: string };
}

const livingEn: LivingCopy = {
  meta: {
    title: "Living — Designed Around the Way You Live",
    description:
      "Discover destinations that bring together everyday needs, services, wellness, and experiences across DAMA developments.",
  },
  hero: {
    eyebrow: "LIVING AT DAMA",
    titleLines: ["Designed Around", "the *Way You Live.*"],
    body: "Discover destinations that bring together everyday needs, services, wellness, and experiences.",
  },
  intro: {
    eyebrow: "Our Approach",
    titleLines: ["More Than Places.", "*Everyday Experiences.*"],
    body: "Living at DAMA is about the way a place works in daily life: the essentials close at hand, spaces to meet, and services that make a neighbourhood feel complete. Each development has its own mix of facilities — we describe them where they actually exist.",
  },
  categories: {
    title: "What shapes the experience",
    items: [
      { title: "Community & Everyday Living", body: "Places where homes, services and daily routines connect.", related: "Rawasin" },
      { title: "Shopping & Dining", body: "Retail, a hypermarket, restaurants and cafés.", related: "Rawasin Mall" },
      { title: "Health & Wellness", body: "Clinics, medical laboratories, pharmacies and a medical reception.", related: "Rawasin Mall" },
      { title: "Fitness & Recreation", body: "Indoor and outdoor gyms and a health club.", related: "Rawasin Mall" },
      { title: "Personal Care & Leisure", body: "A beauty centre, cafés and outdoor space.", related: "Rawasin Mall" },
      { title: "Services & Convenience", body: "Underground parking and everyday essentials in one place.", related: "Rawasin Mall" },
      { title: "Architecture & Public Spaces", body: "An active retail strip and careful circulation across five levels.", related: "Rawasin Mall" },
    ],
  },
  example: {
    eyebrow: "A practical example",
    titleLines: ["Rawasin Mall", "*in New Sohag*"],
    body: "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare, shopping and entertainment together in one place. The facilities below are confirmed features of this destination only.",
    items: [
      "Hypermarket — 754 m²",
      "Retail shops, pharmacies and medical reception",
      "Restaurants and cafés",
      "22 clinics, two medical laboratories and a dedicated department",
      "Indoor and outdoor gyms, health club and beauty centre",
      "Underground parking",
    ],
    cta: "Explore Rawasin Mall",
    note: "These facilities belong to Rawasin Mall. They are not presented as amenities available across every DAMA development.",
  },
  cta: {
    eyebrow: "Let's Start a Conversation",
    titleLines: ["Find the place", "that *fits your life.*"],
    body: "Connect with our team to learn more about DAMA's developments and destinations.",
    button: "Contact Our Team",
  },
};

const livingAr: LivingCopy = {
  meta: {
    title: "الحياة — مصممة حول أسلوب حياتك",
    description: "اكتشف وجهات تجمع بين الاحتياجات اليومية والخدمات والصحة والعافية والتجارب في مشروعات داما.",
  },
  hero: {
    eyebrow: "الحياة مع داما",
    titleLines: ["مصممة حول", "*أسلوب حياتك.*"],
    body: "اكتشف وجهات تجمع بين الاحتياجات اليومية والخدمات والصحة والعافية والتجارب.",
  },
  intro: {
    eyebrow: "نهجنا",
    titleLines: ["أكثر من مجرد أماكن.", "*تجارب يومية.*"],
    body: "الحياة مع داما تعني طريقة عمل المكان في حياتك اليومية: احتياجاتك قريبة، ومساحات للقاء، وخدمات تكتمل بها تجربة المجتمع. لكل مشروع مزيجه الخاص من المرافق، ونصفها في موضعها الصحيح فقط.",
  },
  categories: {
    title: "ما الذي يشكّل التجربة",
    items: [
      { title: "المجتمع والحياة اليومية", body: "أماكن تلتقي فيها المساكن والخدمات وتفاصيل اليوم.", related: "رواسين" },
      { title: "التسوق والمطاعم", body: "محال تجارية وهايبر ماركت ومطاعم وكافيهات.", related: "مول رواسين" },
      { title: "الصحة والعافية", body: "عيادات ومعامل طبية وصيدليات واستقبال طبي.", related: "مول رواسين" },
      { title: "اللياقة والترفيه", body: "صالات رياضية داخلية وخارجية ونادٍ صحي.", related: "مول رواسين" },
      { title: "العناية الشخصية والترفيه", body: "مركز تجميل وكافيهات ومساحات خارجية.", related: "مول رواسين" },
      { title: "الخدمات والسهولة", body: "جراج تحت الأرض والاحتياجات اليومية في مكان واحد.", related: "مول رواسين" },
      { title: "العمارة والفراغات العامة", body: "شريط تجاري نشط وحركة مدروسة عبر خمسة أدوار.", related: "مول رواسين" },
    ],
  },
  example: {
    eyebrow: "مثال عملي",
    titleLines: ["مول رواسين", "*في سوهاج الجديدة*"],
    body: "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في مكان واحد. المرافق التالية مؤكدة لهذه الوجهة وحدها.",
    items: [
      "هايبر ماركت — 754 m²",
      "محال تجارية وصيدليات واستقبال طبي",
      "مطاعم وكافيهات",
      "22 عيادة ومعملان طبيان وقسم متخصص",
      "صالات رياضية داخلية وخارجية ونادٍ صحي ومركز تجميل",
      "جراج تحت الأرض",
    ],
    cta: "استكشف مول رواسين",
    note: "هذه المرافق خاصة بمول رواسين، ولا تُعرض كخدمات متاحة في كل مشروعات داما.",
  },
  cta: {
    eyebrow: "لنبدأ الحديث",
    titleLines: ["جد المكان", "الذي *يناسب حياتك.*"],
    body: "تواصل مع فريقنا لمعرفة المزيد عن مشروعات داما ووجهاتها.",
    button: "تواصل مع الفريق",
  },
};

const impactEn: ImpactCopy = {
  meta: {
    title: "Our Impact",
    description:
      "DAMA Development's approach to community, environment and partnerships. Verified initiatives will be published here once approved.",
  },
  hero: {
    eyebrow: "OUR IMPACT",
    titleLines: ["Places that", "*last.*"],
    body: "DAMA's vision is to lead in creating sustainable, culturally rooted developments that preserve identity, empower communities and improve everyday life.",
  },
  status: {
    eyebrow: "Content status",
    titleLines: ["Verified information", "*comes first.*"],
    body: "DAMA has not yet supplied approved impact figures, environmental certifications, community programmes or awards. Rather than publish unverified claims, this page is intentionally kept in a content-pending state.",
    note: "The structure below is ready for approved content: community impact, environmental responsibility, sustainable development, local partnerships, social initiatives and achievements.",
  },
  framework: {
    eyebrow: "Our framework",
    titleLines: ["Where impact", "*will be reported*"],
    items: [
      { title: "Community Impact", body: "Reserved for approved community programmes and outcomes." },
      { title: "Environmental Responsibility", body: "Reserved for verified environmental commitments and certifications." },
      { title: "Long-Term Value", body: "Reserved for published, measurable development practices." },
      { title: "Local Partnerships", body: "Project-specific collaborations are presented on the relevant project pages." },
      { title: "Social Initiatives", body: "Reserved for approved social initiatives with confirmed details." },
      { title: "Achievements", body: "Reserved for confirmed awards and milestones — no dates or claims are invented." },
    ],
  },
  cta: {
    eyebrow: "Explore DAMA",
    titleLines: ["Discover our", "*developments.*"],
    body: "Learn about Rawasin and Rawasin Mall, the DAMA destinations with published, approved information.",
    button: "View Our Developments",
  },
};

const impactAr: ImpactCopy = {
  meta: {
    title: "أثرنا",
    description: "نهج داما للتطوير العقاري تجاه المجتمع والبيئة والشراكات. تُنشر المبادرات المعتمدة هنا فور توفرها.",
  },
  hero: {
    eyebrow: "أثرنا",
    titleLines: ["أماكن", "*تدوم.*"],
    body: "رؤية داما هي الريادة في إنشاء مشروعات مستدامة متجذّرة ثقافيًا، تحافظ على الهوية وتمكّن المجتمعات وتحسّن الحياة اليومية.",
  },
  status: {
    eyebrow: "حالة المحتوى",
    titleLines: ["المعلومات المعتمدة", "*أولًا.*"],
    body: "لم توفر داما بعد أرقام أثر أو شهادات بيئية أو برامج مجتمعية أو جوائز معتمدة. وحرصًا على عدم نشر ادعاءات غير مؤكدة، تُترك هذه الصفحة في حالة انتظار المحتوى المعتمد.",
    note: "البنية أدناه جاهزة لاستقبال المحتوى المعتمد: الأثر المجتمعي، المسؤولية البيئية، التنمية المستدامة، الشراكات المحلية، المبادرات الاجتماعية والإنجازات.",
  },
  framework: {
    eyebrow: "إطار العمل",
    titleLines: ["أين سيُنشر", "*الأثر*"],
    items: [
      { title: "الأثر المجتمعي", body: "مخصص للبرامج المجتمعية والنتائج المعتمدة." },
      { title: "المسؤولية البيئية", body: "مخصص للالتزامات والشهادات البيئية المؤكدة." },
      { title: "قيمة ممتدة", body: "مخصص للممارسات المنشورة والقابلة للقياس." },
      { title: "الشراكات المحلية", body: "تُعرض التعاونات الخاصة بالمشروعات في صفحاتها." },
      { title: "المبادرات الاجتماعية", body: "مخصص للمبادرات المعتمدة بتفاصيل مؤكدة." },
      { title: "الإنجازات", body: "مخصص للجوائز والمحطات المؤكدة دون اختلاق تواريخ أو ادعاءات." },
    ],
  },
  cta: {
    eyebrow: "اكتشف داما",
    titleLines: ["اكتشف", "*مشروعاتنا.*"],
    body: "تعرّف على رواسين ومول رواسين، وجهتَي داما اللتين تتوفر عنهما معلومات معتمدة منشورة.",
    button: "عرض مشروعاتنا",
  },
};

export const livingContent: Record<Locale, LivingCopy> = { en: livingEn, ar: livingAr };
export const impactContent: Record<Locale, ImpactCopy> = { en: impactEn, ar: impactAr };
