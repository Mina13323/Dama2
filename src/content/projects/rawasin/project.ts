/**
 * Rawasin listing info — transcribed and verified directly from official DAMA
 * Development brochures, master plans, and architectural specifications.
 */
import type { ApartmentModel, ProjectInfo } from "../types";
import { residentialGallery } from "./media";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const modelRows: { id: string; n: number; en: string; ar: string }[] = [
  { id: "type-1", n: 3, en: "210 – 236 m²", ar: "٢١٠ إلى ٢٣٦ م²" },
  { id: "type-2", n: 3, en: "176 – 198 m²", ar: "١٧٦ إلى ١٩٨ م²" },
  { id: "type-3", n: 3, en: "180 – 209 m²", ar: "١٨٠ إلى ٢٠٩ م²" },
  { id: "type-4", n: 2, en: "136 – 152 m²", ar: "١٣٦ إلى ١٥٢ م²" },
  { id: "type-5", n: 2, en: "127.5 – 156 m²", ar: "١٢٧٫٥ إلى ١٥٦ م²" },
];

/**
 * Apartment models contain only what the Rawasin Compound brochure states: bedroom count and area range.
 * No per-type features are published, so none are listed.
 */
const rawasinModelsEn: ApartmentModel[] = modelRows.map((m, i) => ({
  id: m.id,
  type: `Type ${i + 1}`,
  bedrooms: m.n,
  area: m.en,
  name: `${m.n === 3 ? "Three" : "Two"}-Bedroom Apartment`,
  description: `A ${m.n}-bedroom apartment of ${m.en}. The layout balances everyday movement, shared living and privacy.`,
  highlights: [`${m.n} bedrooms`, `${m.en} area range`, "Floor plan published on this page"],
}));

const rawasinModelsAr: ApartmentModel[] = modelRows.map((m, i) => ({
  id: m.id,
  type: `نموذج ${i + 1}`,
  bedrooms: m.n,
  area: m.ar,
  name: m.n === 3 ? "شقة ثلاث غرف نوم" : "شقة غرفتا نوم",
  description: `شقة ${m.n === 3 ? "من ثلاث غرف نوم" : "من غرفتي نوم"} بمساحة ${m.ar}. يوازن التوزيع بين حركة الاستخدام اليومي والمعيشة المشتركة والخصوصية.`,
  highlights: [m.n === 3 ? "ثلاث غرف نوم" : "غرفتا نوم", `نطاق المساحة ${m.ar}`, "مخطط الشقة منشور في هذه الصفحة"],
}));

export const rawasinProject: ProjectInfo = {
  slug: "rawasin",
  name: "Rawasin",
  categories: ["mixed-use", "residential", "commercial"],
  image: asset("/images/rawasin/gallery/residential/rawasin-01-gate-street-md.webp"),
  images: {
    overview: asset("/images/rawasin/gallery/residential/rawasin-20-facade-jacaranda-md.webp"),
    lifestyle: [
      asset("/images/rawasin/gallery/residential/rawasin-14-facade-courtyard-trees-md.webp"),
      asset("/images/rawasin/brochure/courtyard-garden.webp"),
      asset("/images/rawasin/brochure/rooftop-terrace.webp"),
    ],
    gallery: [
      ...residentialGallery,
      asset("/images/rawasin/compound-clubhouse.webp"),
      asset("/images/rawasin/compound-mosque.webp"),
      asset("/images/rawasin/mall-day-exterior.webp"),
      asset("/images/rawasin/mall-night-plaza.webp"),
    ],
  },
  masterPlan: { image: asset("/images/rawasin/gallery/residential/rawasin-34-masterplan-top-lg.webp") },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=New+Sohag%2C+Sohag%2C+Egypt",
  copy: {
    en: {
      location: "New Sohag, Upper Egypt",
      summary:
        "An integrated 7.5-feddan community in New Sohag featuring Hashemi stone architecture, green courtyards, 196 homes, and Rawasin Mall.",
      intro:
        "Rawasin introduces a refined living standard in Upper Egypt, uniting authentic Egyptian architecture with contemporary smart living.",
      overview: {
        titleLines: ["Solid by Name,", "*Timeless by Nature*"],
        paragraphs: [
          "Spanning 7.5 feddans in southern New Sohag, Rawasin brings together 7 residential buildings with 196 thoughtfully planned homes, Rawasin Mall, a serene mosque, and an exclusive clubhouse.",
          "Designed under the architectural direction of Dar Arafa Architecture (led by architect Walid Arafa), the community is crafted in natural Hashemi stone with planted courtyards that capture light and shadow.",
        ],
      },
      lifestyle: {
        titleLines: ["Everyday Life,", "*Rooted in Community*"],
        body: "Life in Rawasin revolves around peaceful central courtyards, green rooftops, a multi-level clubhouse with a rooftop padel court, and smart infrastructure with fibre connectivity by WE.",
      },
      locationNote:
        "Strategically positioned along the New Airport Axis in southern New Sohag, offering rapid direct connectivity to Sohag International Airport, the Banking District, and Al Ahly Club.",
      facts: [
        { icon: "location", label: "Location", value: "New Sohag, Upper Egypt" },
        { icon: "green", label: "Total Area", value: "7.5 Feddans" },
        { icon: "units", label: "Buildings & Units", value: "7 Buildings · 196 Homes" },
        { icon: "type", label: "Destination", value: "Rawasin Compound & Mall" },
        { icon: "style", label: "Architecture", value: "Hashemi Stone (Dar Arafa)" },
      ],
      amenities: [
        { icon: "clubhouse", label: "Clubhouse & Rooftop Padel" },
        { icon: "community", label: "Rawasin Mosque" },
        { icon: "parks", label: "Courtyards & Green Rooftops" },
        { icon: "paths", label: "FTTH Triple Play by WE" },
        { icon: "sports", label: "Commercial & Healthcare Strip" },
      ],
      components: [
        {
          name: "Rawasin Mall",
          href: "mall",
          description:
            "Mixed-use destination across five levels: hypermarket and parking, retail, dining, a food court and kids area, 22 clinic units, medical laboratories, and fitness and personal care.",
        },
      ],
      models: rawasinModelsEn,
    },
    ar: {
      location: "سوهاج الجديدة، صعيد مصر",
      summary:
        "مجتمع سكني متكامل على مساحة 7.5 فدان في سوهاج الجديدة، يتميز بعمارة الحجر الهاشمي، والأفنية الخضراء، و196 منزلاً، ومول رواسين.",
      intro:
        "يقدم رواسين معيارًا عمرانيًا راقيًا في صعيد مصر، يجمع بين الهوية المعمارية المصرية الأصيلة والبنية التحتية الذكية المعاصرة.",
      overview: {
        titleLines: ["ثابت زي اسمه،", "*وأصيل زي روحه*"],
        paragraphs: [
          "على مساحة 7.5 فدان في التوسعات الجنوبية بسوهاج الجديدة، يتشكل رواسين كمجتمع سكني متكامل يضم 7 مبانٍ سكنية تحتوي على 196 وحدة، ومول رواسين، ومسجدًا هادئًا، وناديًا اجتماعيًا مميزًا.",
          "برؤية معمارية متميزة تحت إشراف دار عرفة للعمارة بقيادة المهندس العالمي وليد عرفة، تتشكل الواجهات من الحجر الهاشمي والأفنية الخضراء التي توفر بيئة سكنية حية ومستدامة.",
        ],
      },
      lifestyle: {
        titleLines: ["حياة يومية", "*تجمع بين الأصالة والعصر*"],
        body: "تمتد الحياة في رواسين عبر الأفنية المشتركة والأسطح الخضراء والنادي الاجتماعي متعدد الأدوار مع ملعب بادل على السطح، وبنية ذكية بشبكة ألياف ضوئية من WE.",
      },
      locationNote:
        "موقع استراتيجي على محور المطار الجديد بالتوسع الجنوبي لسوهاج الجديدة، مع وصول مباشر وسريع لمطار سوهاج ومجمع البنوك والنادي الأهلي.",
      facts: [
        { icon: "location", label: "الموقع", value: "سوهاج الجديدة، صعيد مصر" },
        { icon: "green", label: "المساحة الإجمالية", value: "٧٫٥ فدان" },
        { icon: "units", label: "المباني والوحدات", value: "٧ مبانٍ · ١٩٦ وحدة سكنية" },
        { icon: "type", label: "الوجهة", value: "كمبوند ومول رواسين" },
        { icon: "style", label: "الطراز المعماري", value: "حجر هاشمي (دار عرفة)" },
      ],
      amenities: [
        { icon: "clubhouse", label: "النادي الاجتماعي وملعب البادل" },
        { icon: "community", label: "مسجد رواسين" },
        { icon: "parks", label: "الأفنية والأسطح الخضراء" },
        { icon: "paths", label: "بنية اتصالات ذكية فايبر WE" },
        { icon: "sports", label: "وجهة تجارية وطبية متكاملة" },
      ],
      components: [
        {
          name: "مول رواسين",
          href: "mall",
          description:
            "وجهة متعددة الاستخدامات على خمسة مستويات: هايبر ماركت ومواقف، محال تجارية، مطاعم، منطقة طعام ومنطقة أطفال، 22 عيادة، معامل طبية، ولياقة وعناية.",
        },
      ],
      models: rawasinModelsAr,
    },
  },
};
