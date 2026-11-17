/**
 * RAWASIN MALL — structured content module (EN + AR)
 * ==================================================
 *
 * SOURCE OF TRUTH
 * ---------------
 * All factual statements below are transcribed from the `Rawasin Mall - Final.pdf`
 * brochure content supplied in the project brief. No facts have been inferred,
 * rounded or combined. Measurements are stored as the exact strings printed in
 * the brief (e.g. "191.55 m²", "18.32 to 45.4 m²").
 *
 * PROVENANCE / STATUS
 * -------------------
 *  - "confirmed": explicitly stated in the brochure / brief.
 *  - "source-pending": the brief says the information exists in the brochure's
 *    floor-plan drawings, but the PDF itself was NOT supplied to this build.
 *    Unit numbers, individual clinic numbers/areas and the plan images are
 *    therefore left empty instead of being invented. See `docs/IMPLEMENTATION.md`.
 *
 * To publish the original plans, drop files named basement.jpg, ground.jpg,
 * first.jpg, second.jpg, third.jpg into `public/images/rawasin/plans/`. The
 * page checks for them at build time and enables the plan viewer + lightbox
 * automatically — no code change is needed.
 */
import type { Locale } from "./index";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export type FloorId = "basement" | "ground" | "first" | "second" | "third";
export type UnitRow = { number: string; category: string; area: string };
export type Facility = { name: string; area?: string; kind?: "indoor" | "outdoor"; note?: string };

export interface Floor {
  id: FloorId;
  /** Short label used by the floor selector. */
  label: string;
  /** Official level label as printed in the brochure. */
  officialLabel: string;
  planFile: string;
  categories: string[];
  headline: string;
  intro: string;
  highlights: string[];
  facilities: Facility[];
  units: UnitRow[];
  /** "published" => rows are exact; "source-pending" => plan drawing required. */
  scheduleStatus: "published" | "source-pending";
  scheduleNote?: string;
}

export interface MallCopy {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    name: string;
    tagline: string;
    description: string;
    points: string[];
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    statements: { title: string; body: string }[];
    businessTitle: string;
    businessBody: string;
  };
  vision: { eyebrow: string; titleLines: string[]; body: string };
  location: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    destinationsLabel: string;
    destinations: string[];
    accessTitle: string;
    access: { title: string; body: string }[];
    note: string;
    directionsCta: string;
  };
  masterPlan: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    facts: { label: string; value: string; note?: string }[];
    levelsLabel: string;
    levels: string[];
    imageAlt: string;
    imageNote: string;
    cta: string;
  };
  floors: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    selectorLabel: string;
    planLabel: string;
    planPendingTitle: string;
    planPendingBody: string;
    planPendingCta: string;
    zoomIn: string;
    zoomOut: string;
    zoomReset: string;
    openLightbox: string;
    closeLightbox: string;
    planAlt: string;
    activitiesLabel: string;
    facilitiesLabel: string;
    scheduleLabel: string;
    scheduleNumber: string;
    scheduleCategory: string;
    scheduleArea: string;
    scheduleEmpty: string;
    schedulePending: string;
    sourceNote: string;
    list: Floor[];
  };
  unitTypes: {
    eyebrow: string;
    titleLines: string[];
    retail: { title: string; body: string; points: string[] };
    medical: { title: string; body: string; points: string[] };
    disclaimer: string;
    cta: string;
  };
  partners: {
    eyebrow: string;
    titleLines: string[];
    body: string;
    entries: { name: string; role: string; description: string; context: string }[];
    logoNote: string;
  };
  cta: { eyebrow: string; titleLines: string[]; body: string; primary: string; secondary: string };
  source: { label: string; body: string };
  nav: { label: string; items: { id: string; label: string }[] };
}

const en: MallCopy = {
  meta: {
    title: "Rawasin Mall — Where Heritage Meets Tomorrow",
    description:
      "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare, shopping and entertainment together in New Sohag, Upper Egypt.",
  },
  hero: {
    eyebrow: "RAWASIN · A DAMA DEVELOPMENT",
    name: "Rawasin Mall",
    tagline: "Where Heritage Meets Tomorrow.",
    description:
      "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare, shopping, and entertainment together in one place.",
    points: [
      "A destination for shopping and everyday essentials",
      "Dedicated medical facilities",
      "Fitness and personal care",
      "Restaurants and cafés",
      "A combination of commercial and service activities",
    ],
    primaryCta: "Explore the Mall",
    secondaryCta: "Get in Touch",
    imageAlt: "Aerial architectural view of the Rawasin development in New Sohag",
  },
  about: {
    eyebrow: "About Rawasin Mall",
    titleLines: ["A Complete", "Everyday *Experience*"],
    lead: "Rawasin Mall is a mixed-use destination bringing lifestyle, healthcare and entertainment together in one place.",
    statements: [
      {
        title: "A wide range of services",
        body: "A wide range of services creates a complete experience.",
      },
      {
        title: "A lively hub",
        body: "We are creating a lively hub of energy, connection and everyday life.",
      },
      {
        title: "A meeting point",
        body: "A dynamic meeting point for everyone.",
      },
    ],
    businessTitle: "For commercial customers",
    businessBody:
      "Thoughtfully designed retail and medical units support your long-term business goals, opening opportunities to invest and reach your full potential. We create a lasting experience, with a unique atmosphere that excites today and inspires for years to come.",
  },
  vision: {
    eyebrow: "Our Vision",
    titleLines: ["New Energy", "for *New Sohag*"],
    body: "To bring new energy to New Sohag, step by step, through memorable experiences.",
  },
  location: {
    eyebrow: "Location",
    titleLines: ["Connected to", "*New Sohag*"],
    body: "Rawasin Mall is strategically located in the southern expansion of New Sohag, with easy access to key destinations. The mall sits within Rawasin, bringing homes, services and modern living together.",
    destinationsLabel: "Nearby destinations listed in the brochure",
    destinations: [
      "Sohag International Airport",
      "Banking District",
      "Al Ahly Club",
      "Medical Centre and Hospitals",
      "Educational Services and International Schools",
      "Future Neighbourhood Services Area",
    ],
    accessTitle: "Road network and access",
    access: [
      {
        title: "Modern road network",
        body: "A modern road network provides fast, direct access, avoiding city-centre traffic.",
      },
      {
        title: "New Airport Axis",
        body: "Connects the project directly to the airport highway.",
      },
    ],
    note: "The brochure does not publish travel times or distances, and exact plot coordinates are pending DAMA approval. The map link opens the wider New Sohag area for orientation.",
    directionsCta: "Open the area in Google Maps",
  },
  masterPlan: {
    eyebrow: "Master Plan",
    titleLines: ["Planned for", "*Easy Circulation*"],
    body: "Rawasin Mall's master plan features an active retail strip, with retail, medical and leisure spaces serving a wide range of visitors and businesses. The mall spans a basement, a ground floor and three upper floors, carefully planned for easy circulation and a better experience for visitors and businesses.",
    facts: [
      { label: "Commercial land area", value: "6,280 m²" },
      { label: "Frontage", value: "123 metres" },
      { label: "Project levels", value: "Basement + Ground + First + Second + Third" },
    ],
    levelsLabel: "Project levels",
    levels: ["Third Floor", "Second Floor", "First Floor", "Ground Floor", "Basement"],
    imageAlt: "Aerial architectural view of Rawasin and its surrounding context",
    imageNote:
      "Aerial view shown for context. The official technical master-plan drawing and floor plans from the brochure will be published here once the source files are supplied.",
    cta: "Explore the Floors",
  },
  floors: {
    eyebrow: "Floor Explorer",
    titleLines: ["Explore", "the *Floors*"],
    body: "Switch between the five levels of Rawasin Mall. Each level shows its confirmed activities and facility areas, plus the unit schedule where the published plan data is available.",
    selectorLabel: "Select a floor",
    planLabel: "Original floor plan",
    planPendingTitle: "Original floor plan pending",
    planPendingBody:
      "The brochure's floor-plan drawing for this level has not been supplied to the website build. No redrawn or approximate plan is shown, so that unit layouts stay accurate.",
    planPendingCta: "Request the official plan",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    zoomReset: "Reset zoom",
    openLightbox: "Open floor plan in full screen",
    closeLightbox: "Close floor plan",
    planAlt: "Original {floor} floor plan from the Rawasin Mall brochure",
    activitiesLabel: "Main activities",
    facilitiesLabel: "Facilities & confirmed areas",
    scheduleLabel: "Unit schedule",
    scheduleNumber: "Unit",
    scheduleCategory: "Category",
    scheduleArea: "Area",
    scheduleEmpty: "No individual unit rows have been published for this level.",
    schedulePending:
      "Unit numbers and individual areas are printed on the original floor plan. They will be transcribed exactly once the brochure source file is available — they are not estimated here.",
    sourceNote: "Source: Rawasin Mall brochure. Areas are reproduced exactly as published; no values are rounded.",
    list: [
      {
        id: "basement",
        label: "Basement",
        officialLabel: "Basement Floor",
        planFile: "/images/rawasin/plans/basement.jpg",
        categories: ["Hypermarket", "Underground Parking"],
        headline: "Everyday Essentials in One Place.",
        intro: "The basement combines a large hypermarket with underground parking for convenient everyday access to the mall.",
        highlights: ["Hypermarket: 754 m²", "Underground parking", "Convenient access for everyday shopping"],
        facilities: [
          { name: "Hypermarket", area: "754 m²", note: "Dedicated space for everyday shopping and household essentials" },
          { name: "Underground parking", note: "Convenient access to the mall for everyday shopping" },
        ],
        units: [],
        scheduleStatus: "published",
        scheduleNote: "The brochure publishes the hypermarket area and underground parking, but no numbered retail schedule for this level.",
      },
      {
        id: "ground",
        label: "Ground Floor",
        officialLabel: "Ground Floor",
        planFile: "/images/rawasin/plans/ground.jpg",
        categories: ["Retail Shops", "Restaurants", "Cafés", "Pharmacies", "Medical Reception"],
        headline: "Shops, Restaurants and Welcome.",
        intro: "The ground floor brings together retail shops, restaurants, cafés, pharmacies and a medical reception.",
        highlights: ["5 activity categories", "3 published restaurant & café areas", "Medical reception"],
        facilities: [
          { name: "Restaurant 1", area: "192.5 m²" },
          { name: "Restaurant 2", area: "168.9 m²" },
          { name: "Café", area: "191.55 m²" },
          { name: "Retail shops", note: "Unit numbers and areas are printed on the original plan" },
          { name: "Pharmacies" },
          { name: "Medical reception", note: "A separate functional component on this level" },
        ],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "The brochure provides a retail unit schedule with unit numbers and areas on the Ground Floor plan. Those exact rows are pending transcription from the source drawing and are intentionally not approximated.",
      },
      {
        id: "first",
        label: "First Floor",
        officialLabel: "First Floor",
        planFile: "/images/rawasin/plans/first.jpg",
        categories: [],
        headline: "First Floor.",
        intro: "The first floor is presented using its original plan labels. The brochure's floor-plan drawing is the authoritative source for its unit categories, unit numbers, areas and service labels.",
        highlights: ["Original plan labels pending transcription", "No function inferred from assumptions"],
        facilities: [],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "All unit categories, unit numbers, areas, and service and facility labels for this level must be extracted from the original First Floor plan. No first-floor function has been assumed.",
      },
      {
        id: "second",
        label: "Second Floor",
        officialLabel: "Second Floor",
        planFile: "/images/rawasin/plans/second.jpg",
        categories: ["Medical & Healthcare", "Clinics", "Medical Laboratories"],
        headline: "Medical & Healthcare.",
        intro: "The second floor offers 22 clinic units, ranging from 18.32 to 45.4 m², for different medical specialties and operational needs.",
        highlights: ["22 clinic units", "Clinic areas from 18.32 to 45.4 m²", "2 medical laboratories", "Obstetrics & Gynecology Department"],
        facilities: [
          { name: "Clinic units (22)", area: "18.32 to 45.4 m²", note: "Range published for different medical specialties and operational needs" },
          { name: "Medical Laboratory 1", area: "189 m²" },
          { name: "Medical Laboratory 2", area: "174.3 m²" },
          { name: "Obstetrics & Gynecology Department", area: "638 m²", note: "A dedicated department — not an individual clinic unit" },
        ],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "Each clinic's individual number and area appears on the original Second Floor plan. Those 22 rows will be transcribed exactly; the department and laboratories are listed separately above and are not represented as clinics.",
      },
      {
        id: "third",
        label: "Third Floor",
        officialLabel: "Third Floor",
        planFile: "/images/rawasin/plans/third.jpg",
        categories: ["Fitness", "Health Club", "Beauty Centre", "Clinic", "Café"],
        headline: "Fitness, Personal Care and Leisure.",
        intro: "The third floor includes indoor and outdoor gyms, a health club, a beauty centre, a café with outdoor space, and a clinic unit. A variety of activities creates space for fitness, personal care and leisure.",
        highlights: ["Indoor & outdoor facilities", "7 published facility areas", "Café with outdoor space"],
        facilities: [
          { name: "Indoor Gym", area: "350.7 m²", kind: "indoor" },
          { name: "Outdoor Gym", area: "212.8 m²", kind: "outdoor" },
          { name: "Health Club", area: "186.7 m²", kind: "indoor" },
          { name: "Beauty Centre", area: "71.9 m²", kind: "indoor" },
          { name: "Clinic", area: "38 m²", kind: "indoor" },
          { name: "Café", area: "154 m²", kind: "indoor" },
          { name: "Outdoor Café", area: "148 m²", kind: "outdoor" },
        ],
        units: [
          { number: "Indoor Gym", category: "Fitness", area: "350.7 m²" },
          { number: "Outdoor Gym", category: "Fitness", area: "212.8 m²" },
          { number: "Health Club", category: "Wellness", area: "186.7 m²" },
          { number: "Beauty Centre", category: "Personal Care", area: "71.9 m²" },
          { number: "Clinic", category: "Medical", area: "38 m²" },
          { number: "Café", category: "Dining", area: "154 m²" },
          { number: "Outdoor Café", category: "Dining", area: "148 m²" },
        ],
        scheduleStatus: "published",
        scheduleNote: "Facility areas reproduced exactly from the brochure's third-floor table.",
      },
    ],
  },
  unitTypes: {
    eyebrow: "Unit Types",
    titleLines: ["Spaces Built", "Around *Your Business*"],
    retail: {
      title: "Retail Units",
      body: "Purpose-designed retail units offer flexible layouts and a range of sizes to suit different businesses. The mall's prime location and mix of well-known brands attract a steady flow of visitors, supporting the success and growth of your business.",
      points: ["Retail shops on the Ground Floor", "Restaurant 1 — 192.5 m²", "Restaurant 2 — 168.9 m²", "Café — 191.55 m²"],
    },
    medical: {
      title: "Medical Units",
      body: "Rawasin Mall offers dedicated medical units suited to clinics and a range of healthcare services. These spaces support quality healthcare within a lively, integrated commercial setting.",
      points: [
        "22 clinics from 18.32 to 45.4 m² on the Second Floor",
        "Medical Laboratory 1 — 189 m²",
        "Medical Laboratory 2 — 174.3 m²",
        "Obstetrics & Gynecology Department — 638 m²",
        "Medical reception and waiting areas",
        "Clinic unit on the Third Floor — 38 m²",
      ],
    },
    disclaimer:
      "Availability, prices, payment plans, ownership and rental arrangements are not published here. Contact the DAMA team for current, approved information.",
    cta: "Enquire About Units",
  },
  partners: {
    eyebrow: "Project Partners",
    titleLines: ["Working", "*Together*"],
    body: "These organisations are presented in their project-specific roles as stated in the Rawasin Mall brochure. They are not described as company-wide strategic partners.",
    entries: [
      {
        name: "Dar Arafa Architecture",
        role: "Architectural direction — Rawasin Mall",
        description: "The brochure credits Dar Arafa Architecture, under the architectural direction of architect Walid Arafa.",
        context: "Project-specific design role",
      },
      {
        name: "ACCORD",
        role: "Mall management & operations partner",
        description:
          "As the mall's management and operations partner, ACCORD provides comprehensive property services to maintain high quality and efficiency, creating a positive experience for visitors and tenants. Through its operational expertise, partnerships and franchises, ACCORD helps bring distinctive brands and services to the mall, adding value and creating a complete retail experience.",
        context: "Rawasin Mall operations",
      },
      {
        name: "WE",
        role: "Telecommunications & technology infrastructure partner",
        description:
          "In partnership with WE, Egypt's leading telecommunications provider, Rawasin Mall features advanced technology infrastructure.",
        context: "Rawasin Mall infrastructure",
      },
    ],
    logoNote: "Official partner logos will be added once supplied and approved by DAMA.",
  },
  cta: {
    eyebrow: "Let's Start a Conversation",
    titleLines: ["Discover Rawasin", "*Mall*"],
    body: "Speak with our team about retail and medical units, the mall's facilities, or partnership opportunities.",
    primary: "Contact Our Team",
    secondary: "Back to Rawasin",
  },
  source: {
    label: "Content source",
    body: "All confirmed facts on this page come from the official Rawasin Mall brochure. Proposed headlines and supporting website copy are draft marketing text and remain subject to DAMA's brand approval.",
  },
  nav: {
    label: "On this page",
    items: [
      { id: "about", label: "About" },
      { id: "vision", label: "Vision" },
      { id: "location", label: "Location" },
      { id: "master-plan", label: "Master Plan" },
      { id: "floors", label: "Floors" },
      { id: "unit-types", label: "Unit Types" },
      { id: "partners", label: "Partners" },
      { id: "gallery", label: "Gallery" },
      { id: "enquire", label: "Enquire" },
    ],
  },
};

const ar: MallCopy = {
  meta: {
    title: "مول رواسين — حيث يلتقي التراث بالغد",
    description:
      "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في سوهاج الجديدة بصعيد مصر.",
  },
  hero: {
    eyebrow: "رواسين · أحد مشروعات داما",
    name: "مول رواسين",
    tagline: "حيث يلتقي التراث بالغد.",
    description: "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في مكان واحد.",
    points: [
      "وجهة للتسوق والاحتياجات اليومية",
      "مرافق طبية مخصصة",
      "اللياقة البدنية والعناية الشخصية",
      "مطاعم وكافيهات",
      "مزيج من الأنشطة التجارية والخدمية",
    ],
    primaryCta: "استكشف المول",
    secondaryCta: "تواصل معنا",
    imageAlt: "صورة جوية معمارية لمشروع رواسين في سوهاج الجديدة",
  },
  about: {
    eyebrow: "عن مول رواسين",
    titleLines: ["تجربة يومية", "*متكاملة*"],
    lead: "مول رواسين وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والترفيه في مكان واحد.",
    statements: [
      { title: "مجموعة واسعة من الخدمات", body: "مجموعة واسعة من الخدمات تصنع تجربة متكاملة." },
      { title: "مركز نابض بالحياة", body: "نبتكر مركزًا نابضًا بالطاقة والتواصل والحياة اليومية." },
      { title: "نقطة التقاء", body: "نقطة التقاء ديناميكية للجميع." },
    ],
    businessTitle: "للعملاء التجاريين",
    businessBody:
      "تدعم الوحدات التجارية والطبية المصممة بعناية أهدافكم طويلة المدى، وتفتح فرصًا للاستثمار والوصول إلى أقصى إمكاناتكم. نصنع تجربة تدوم، بأجواء فريدة تبهج اليوم وتُلهم لسنوات قادمة.",
  },
  vision: {
    eyebrow: "رؤيتنا",
    titleLines: ["طاقة جديدة", "لـ *سوهاج الجديدة*"],
    body: "أن نضيف طاقة جديدة إلى سوهاج الجديدة، خطوة بخطوة، من خلال تجارب لا تُنسى.",
  },
  location: {
    eyebrow: "الموقع",
    titleLines: ["متصل بـ", "*سوهاج الجديدة*"],
    body: "يقع مول رواسين في موقع استراتيجي بالتوسع الجنوبي لسوهاج الجديدة، مع سهولة الوصول إلى الوجهات الرئيسية. ويقع المول داخل مشروع رواسين، ليجمع بين المساكن والخدمات والحياة العصرية.",
    destinationsLabel: "الوجهات القريبة الواردة بالكتيّب",
    destinations: [
      "مطار سوهاج الدولي",
      "المنطقة البنكية",
      "النادي الأهلي",
      "المركز الطبي والمستشفيات",
      "الخدمات التعليمية والمدارس الدولية",
      "منطقة خدمات الأحياء المستقبلية",
    ],
    accessTitle: "شبكة الطرق وسهولة الوصول",
    access: [
      { title: "شبكة طرق حديثة", body: "توفر شبكة الطرق الحديثة وصولًا سريعًا ومباشرًا، بعيدًا عن ازدحام وسط المدينة." },
      { title: "محور المطار الجديد", body: "يربط المشروع مباشرةً بطريق المطار." },
    ],
    note: "لا ينشر الكتيّب أوقات أو مسافات الوصول، وإحداثيات الموقع الدقيقة قيد اعتماد داما. يفتح رابط الخريطة نطاق سوهاج الجديدة للاسترشاد العام.",
    directionsCta: "افتح المنطقة على خرائط جوجل",
  },
  masterPlan: {
    eyebrow: "المخطط العام",
    titleLines: ["مخطط من أجل", "*سهولة الحركة*"],
    body: "يتميز المخطط العام لمول رواسين بشريط تجاري نشط يضم مساحات للتجزئة والخدمات الطبية والترفيه تخدم شريحة واسعة من الزوار والأنشطة التجارية. يمتد المول على بدروم ودور أرضي وثلاثة أدوار علوية، مخططة بعناية لسهولة الحركة وتجربة أفضل للزوار والأنشطة التجارية.",
    facts: [
      { label: "مساحة الأرض التجارية", value: "6,280 m²" },
      { label: "الواجهة", value: "123 m" },
      { label: "أدوار المشروع", value: "بدروم + أرضي + أول + ثانٍ + ثالث" },
    ],
    levelsLabel: "أدوار المشروع",
    levels: ["الدور الثالث", "الدور الثاني", "الدور الأول", "الدور الأرضي", "البدروم"],
    imageAlt: "صورة جوية معمارية لمشروع رواسين ومحيطه",
    imageNote:
      "الصورة الجوية للاسترشاد العام. سيتم نشر المخطط العام الفني الرسمي ومخططات الأدوار من الكتيّب هنا فور توفير الملفات المصدر.",
    cta: "استكشف الأدوار",
  },
  floors: {
    eyebrow: "مستكشف الأدوار",
    titleLines: ["استكشف", "*الأدوار*"],
    body: "يمكنك التنقل بين أدوار مول رواسين الخمسة. يعرض كل دور الأنشطة المؤكدة ومساحات المرافق، بالإضافة إلى جدول الوحدات عند توفر بيانات المخطط المنشورة.",
    selectorLabel: "اختر الدور",
    planLabel: "مخطط الدور الأصلي",
    planPendingTitle: "مخطط الدور الأصلي قيد الانتظار",
    planPendingBody: "لم يتم تزويد موقع الويب بمخطط هذا الدور من الكتيّب. لا نعرض مخططًا مرسومًا أو تقريبيًا حفاظًا على دقة توزيع الوحدات.",
    planPendingCta: "اطلب المخطط الرسمي",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    zoomReset: "إعادة الضبط",
    openLightbox: "افتح مخطط الدور في وضع ملء الشاشة",
    closeLightbox: "أغلق مخطط الدور",
    planAlt: "مخطط {floor} الأصلي من كتيّب مول رواسين",
    activitiesLabel: "الأنشطة الرئيسية",
    facilitiesLabel: "المرافق والمساحات المؤكدة",
    scheduleLabel: "جدول الوحدات",
    scheduleNumber: "الوحدة",
    scheduleCategory: "الفئة",
    scheduleArea: "المساحة",
    scheduleEmpty: "لم تُنشر صفوف وحدات فردية لهذا الدور.",
    schedulePending:
      "أرقام الوحدات والمساحات الفردية مطبوعة على مخطط الدور الأصلي. سيتم نقلها كما هي فور توفر ملف الكتيّب المصدر، دون تقدير أو تقريب.",
    sourceNote: "المصدر: كتيّب مول رواسين. تُنقل المساحات كما وردت تمامًا دون تقريب.",
    list: [
      {
        id: "basement",
        label: "البدروم",
        officialLabel: "البدروم",
        planFile: "/images/rawasin/plans/basement.jpg",
        categories: ["هايبر ماركت", "جراج تحت الأرض"],
        headline: "الاحتياجات اليومية في مكان واحد.",
        intro: "يجمع البدروم بين هايبر ماركت كبير وجراج تحت الأرض يوفر وصولًا مريحًا إلى المول بشكل يومي.",
        highlights: ["هايبر ماركت: 754 m²", "جراج تحت الأرض", "وصول مريح للتسوق اليومي"],
        facilities: [
          { name: "هايبر ماركت", area: "754 m²", note: "مساحة مخصصة للتسوق اليومي والاحتياجات المنزلية" },
          { name: "جراج تحت الأرض", note: "وصول مريح إلى المول للتسوق اليومي" },
        ],
        units: [],
        scheduleStatus: "published",
        scheduleNote: "ينشر الكتيّب مساحة الهايبر ماركت والجراج تحت الأرض، دون جدول وحدات مرقّم لهذا الدور.",
      },
      {
        id: "ground",
        label: "الدور الأرضي",
        officialLabel: "الدور الأرضي",
        planFile: "/images/rawasin/plans/ground.jpg",
        categories: ["محال تجارية", "مطاعم", "كافيهات", "صيدليات", "استقبال طبي"],
        headline: "محال ومطاعم واستقبال.",
        intro: "يجمع الدور الأرضي بين المحال التجارية والمطاعم والكافيهات والصيدليات واستقبال طبي.",
        highlights: ["5 فئات أنشطة", "3 مساحات منشورة للمطاعم والكافيه", "استقبال طبي"],
        facilities: [
          { name: "مطعم 1", area: "192.5 m²" },
          { name: "مطعم 2", area: "168.9 m²" },
          { name: "كافيه", area: "191.55 m²" },
          { name: "محال تجارية", note: "أرقام الوحدات والمساحات مطبوعة على المخطط الأصلي" },
          { name: "صيدليات" },
          { name: "استقبال طبي", note: "مكوّن وظيفي مستقل في هذا الدور" },
        ],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "يتضمن الكتيّب جدولًا للوحدات التجارية بأرقامها ومساحاتها على مخطط الدور الأرضي. هذه الصفوف قيد النقل من المخطط المصدر ولا يتم تقديرها.",
      },
      {
        id: "first",
        label: "الدور الأول",
        officialLabel: "الدور الأول",
        planFile: "/images/rawasin/plans/first.jpg",
        categories: [],
        headline: "الدور الأول.",
        intro: "يُعرض الدور الأول وفق تسميات مخططه الأصلي. مخطط الكتيّب هو المرجع المعتمد لفئات الوحدات وأرقامها ومساحاتها وتسميات الخدمات والمرافق.",
        highlights: ["تسميات المخطط الأصلي قيد النقل", "لا يتم استنتاج وظيفة الدور من الافتراضات"],
        facilities: [],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "يجب استخراج جميع فئات الوحدات وأرقامها ومساحاتها وتسميات الخدمات والمرافق لهذا الدور من مخطط الدور الأول الأصلي. لم يتم افتراض أي وظيفة للدور.",
      },
      {
        id: "second",
        label: "الدور الثاني",
        officialLabel: "الدور الثاني",
        planFile: "/images/rawasin/plans/second.jpg",
        categories: ["طبي وصحي", "عيادات", "معامل طبية"],
        headline: "الخدمات الطبية والرعاية الصحية.",
        intro: "يضم الدور الثاني 22 وحدة عيادة تتراوح مساحاتها بين 18.32 و45.4 m² لتخصصات طبية واحتياجات تشغيلية مختلفة.",
        highlights: ["22 وحدة عيادة", "مساحات العيادات من 18.32 إلى 45.4 m²", "معملان طبيان", "قسم أمراض النساء والتوليد"],
        facilities: [
          { name: "وحدات العيادات (22)", area: "18.32 to 45.4 m²", note: "نطاق المساحات المنشور لتخصصات طبية واحتياجات تشغيلية مختلفة" },
          { name: "معمل طبي 1", area: "189 m²" },
          { name: "معمل طبي 2", area: "174.3 m²" },
          { name: "قسم أمراض النساء والتوليد", area: "638 m²", note: "قسم مستقل — وليس وحدة عيادة فردية" },
        ],
        units: [],
        scheduleStatus: "source-pending",
        scheduleNote:
          "رقم ومساحة كل عيادة مطبوعان على مخطط الدور الثاني الأصلي. سيتم نقل الصفوف الـ22 كما هي، مع إدراج القسم والمعملين بشكل منفصل أعلاه وعدم اعتبارهما عيادات.",
      },
      {
        id: "third",
        label: "الدور الثالث",
        officialLabel: "الدور الثالث",
        planFile: "/images/rawasin/plans/third.jpg",
        categories: ["لياقة بدنية", "نادي صحي", "مركز تجميل", "عيادة", "كافيه"],
        headline: "اللياقة والعناية الشخصية والترفيه.",
        intro: "يضم الدور الثالث صالات رياضية داخلية وخارجية وناديًا صحيًا ومركز تجميل وكافيه بمساحة خارجية ووحدة عيادة. تنوّع الأنشطة يوفر مساحة للياقة البدنية والعناية الشخصية والترفيه.",
        highlights: ["مرافق داخلية وخارجية", "7 مساحات مرافق منشورة", "كافيه بمساحة خارجية"],
        facilities: [
          { name: "صالة رياضية داخلية", area: "350.7 m²", kind: "indoor" },
          { name: "صالة رياضية خارجية", area: "212.8 m²", kind: "outdoor" },
          { name: "النادي الصحي", area: "186.7 m²", kind: "indoor" },
          { name: "مركز التجميل", area: "71.9 m²", kind: "indoor" },
          { name: "عيادة", area: "38 m²", kind: "indoor" },
          { name: "كافيه", area: "154 m²", kind: "indoor" },
          { name: "كافيه خارجي", area: "148 m²", kind: "outdoor" },
        ],
        units: [
          { number: "صالة رياضية داخلية", category: "لياقة بدنية", area: "350.7 m²" },
          { number: "صالة رياضية خارجية", category: "لياقة بدنية", area: "212.8 m²" },
          { number: "النادي الصحي", category: "صحة وعافية", area: "186.7 m²" },
          { number: "مركز التجميل", category: "عناية شخصية", area: "71.9 m²" },
          { number: "عيادة", category: "طبي", area: "38 m²" },
          { number: "كافيه", category: "مطاعم وكافيهات", area: "154 m²" },
          { number: "كافيه خارجي", category: "مطاعم وكافيهات", area: "148 m²" },
        ],
        scheduleStatus: "published",
        scheduleNote: "مساحات المرافق منقولة كما وردت تمامًا في جدول الدور الثالث بالكتيّب.",
      },
    ],
  },
  unitTypes: {
    eyebrow: "أنواع الوحدات",
    titleLines: ["مساحات صُممت", "حول *نشاطك*"],
    retail: {
      title: "الوحدات التجارية",
      body: "توفر الوحدات التجارية المصممة بعناية تخطيطات مرنة ومساحات متنوعة تناسب مختلف الأنشطة. ويجذب الموقع المتميز للمول ومزيجه من العلامات المعروفة تدفقًا مستمرًا من الزوار، بما يدعم نجاح نشاطك ونموه.",
      points: ["محال تجارية بالدور الأرضي", "مطعم 1 — 192.5 m²", "مطعم 2 — 168.9 m²", "كافيه — 191.55 m²"],
    },
    medical: {
      title: "الوحدات الطبية",
      body: "يوفر مول رواسين وحدات طبية مخصصة تناسب العيادات ومجموعة من خدمات الرعاية الصحية. وتدعم هذه المساحات تقديم رعاية صحية عالية الجودة داخل بيئة تجارية متكاملة نابضة بالحياة.",
      points: [
        "22 عيادة من 18.32 إلى 45.4 m² بالدور الثاني",
        "معمل طبي 1 — 189 m²",
        "معمل طبي 2 — 174.3 m²",
        "قسم أمراض النساء والتوليد — 638 m²",
        "مناطق استقبال وانتظار",
        "وحدة عيادة بالدور الثالث — 38 m²",
      ],
    },
    disclaimer: "لا ننشر هنا توفر الوحدات أو الأسعار أو خطط السداد أو ترتيبات الملكية والإيجار. تواصل مع فريق داما للحصول على المعلومات المعتمدة الحالية.",
    cta: "استفسر عن الوحدات",
  },
  partners: {
    eyebrow: "شركاء المشروع",
    titleLines: ["نعمل", "*معًا*"],
    body: "تُعرض هذه الجهات في أدوارها الخاصة بمشروع مول رواسين كما وردت في الكتيّب، ولا تُوصف بأنها شراكات استراتيجية على مستوى الشركة.",
    entries: [
      {
        name: "دار عرفة للعمارة",
        role: "التوجيه المعماري — مول رواسين",
        description: "ينسب الكتيّب التوجيه المعماري إلى دار عرفة للعمارة، تحت إشراف المهندس المعماري وليد عرفة.",
        context: "دور تصميمي خاص بالمشروع",
      },
      {
        name: "أكورد",
        role: "شريك إدارة وتشغيل المول",
        description:
          "بصفته شريك إدارة وتشغيل المول، تقدّم أكورد خدمات عقارية متكاملة للحفاظ على الجودة والكفاءة، بما يصنع تجربة إيجابية للزوار والمستأجرين. ومن خلال خبرتها التشغيلية وشراكاتها وامتيازاتها، تسهم أكورد في جلب علامات وخدمات مميزة إلى المول، لتضيف قيمة وتكمل التجربة التجارية.",
        context: "تشغيل مول رواسين",
      },
      {
        name: "WE",
        role: "شريك الاتصالات والبنية التحتية التقنية",
        description: "بالشراكة مع WE، الشركة الرائدة في مجال الاتصالات في مصر، يتمتع مول رواسين ببنية تحتية تقنية متقدمة.",
        context: "بنية تحتية لمول رواسين",
      },
    ],
    logoNote: "ستُضاف الشعارات الرسمية للشركاء فور توفيرها واعتمادها من داما.",
  },
  cta: {
    eyebrow: "لنبدأ الحديث",
    titleLines: ["اكتشف مول", "*رواسين*"],
    body: "تحدث مع فريقنا عن الوحدات التجارية والطبية ومرافق المول أو فرص الشراكة.",
    primary: "تواصل مع الفريق",
    secondary: "العودة إلى رواسين",
  },
  source: {
    label: "مصدر المحتوى",
    body: "جميع المعلومات المؤكدة في هذه الصفحة مأخوذة من كتيّب مول رواسين الرسمي. العناوين والنصوص التسويقية المقترحة مسودة قابلة للتعديل وتخضع لاعتماد هوية داما.",
  },
  nav: {
    label: "في هذه الصفحة",
    items: [
      { id: "about", label: "عن المول" },
      { id: "vision", label: "الرؤية" },
      { id: "location", label: "الموقع" },
      { id: "master-plan", label: "المخطط العام" },
      { id: "floors", label: "الأدوار" },
      { id: "unit-types", label: "أنواع الوحدات" },
      { id: "partners", label: "الشركاء" },
      { id: "gallery", label: "معرض الصور" },
      { id: "enquire", label: "تواصل" },
    ],
  },
};

export const rawasinMall: Record<Locale, MallCopy> = { en, ar };

/** Aerial context image used on the mall hero, master plan and feature cards. */
export const mallImages = {
  hero: asset("/images/rawasin-aerial-masterplan.jpg"),
  aerial: asset("/images/rawasin-aerial.webp"),
  lifestyle: asset("/images/lifestyle-terrace.jpg"),
  courtyard: asset("/images/dama-courtyard-living.jpg"),
  entrance: asset("/images/lifestyle-entrance.webp"),
} as const;

/** Google Maps *area search* — no invented plot coordinates. */
export const mallAreaMapUrl = "https://www.google.com/maps/search/?api=1&query=New+Sohag%2C+Sohag%2C+Egypt";
