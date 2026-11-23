/**
 * Project portfolio — single source of truth for development content.
 *
 * Transcribed and verified directly from official DAMA Development brochures,
 * master plans, and architectural specifications.
 */
import type { Locale } from "./index";
import { residentialGallery } from "./rawasin-media";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

export type ProjectSlug = "rawasin" | "dama-residence" | "dama-view";
export type ProjectCategory = "residential" | "commercial" | "mixed-use";
export type FactIcon = "type" | "units" | "location" | "status" | "green" | "style";
export type AmenityIcon = "clubhouse" | "pool" | "sports" | "parks" | "paths" | "community";

export type ProjectFact = { icon: FactIcon; label: string; value: string };
export type ProjectAmenity = { icon: AmenityIcon; label: string };

type Localized<T> = Record<Locale, T>;

export interface ProjectComponent {
  name: string;
  href: string;
  description: string;
}

export interface ApartmentModel {
  id: string;
  type: string;
  bedrooms: number;
  area: string;
  name: string;
  description: string;
  highlights: string[];
}

export interface ProjectCopy {
  location: string;
  /** One-line description for cards and listings. */
  summary: string;
  /** Hero description on the details page. */
  intro: string;
  overview: { titleLines: string[]; paragraphs: string[] };
  lifestyle?: { titleLines: string[]; body: string };
  locationNote?: string;
  facts: ProjectFact[];
  amenities: ProjectAmenity[];
  components: ProjectComponent[];
  models?: ApartmentModel[];
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  categories: ProjectCategory[];
  image: string;
  images: { overview: string; lifestyle: string[]; gallery: string[] };
  masterPlan?: { image: string; pdf?: string };
  mapUrl?: string;
  copy: Localized<ProjectCopy>;
}

const rawasinModelsEn: ApartmentModel[] = [
  {
    id: "type-1",
    type: "Type 1",
    bedrooms: 3,
    area: "210 – 236 m²",
    name: "Three-Bedroom Master Layout",
    description: "Generous family residence with wide reception halls and direct garden courtyard views.",
    highlights: ["3 Bedrooms with en-suite master", "Expansive hospitality salon", "Dual courtyard orientation"],
  },
  {
    id: "type-2",
    type: "Type 2",
    bedrooms: 3,
    area: "176 – 198 m²",
    name: "Three-Bedroom Balanced Plan",
    description: "Thoughtful architectural division separating private living quarters from reception areas.",
    highlights: ["3 Bedrooms", "Distinct private & shared zoning", "Natural cross-ventilation"],
  },
  {
    id: "type-3",
    type: "Type 3",
    bedrooms: 3,
    area: "180 – 209 m²",
    name: "Three-Bedroom Sunlit Residence",
    description: "Designed for daylight optimization with connected living rooms and private family balcony.",
    highlights: ["3 Bedrooms", "Daylight-oriented living room", "Sheltered outdoor terrace"],
  },
  {
    id: "type-4",
    type: "Type 4",
    bedrooms: 2,
    area: "136 – 152 m²",
    name: "Two-Bedroom Modern Suite",
    description: "Functional ergonomic layout maximizing usable space for young families and contemporary living.",
    highlights: ["2 Bedrooms", "Open living and dining", "High space efficiency"],
  },
  {
    id: "type-5",
    type: "Type 5",
    bedrooms: 2,
    area: "127.5 – 156 m²",
    name: "Two-Bedroom Streamlined Home",
    description: "Privacy-centric modern home with abundant natural lighting and smart home infrastructure readiness.",
    highlights: ["2 Bedrooms", "Low-maintenance practical plan", "Smart home ready"],
  },
];

const rawasinModelsAr: ApartmentModel[] = [
  {
    id: "type-1",
    type: "نموذج 1",
    bedrooms: 3,
    area: "٢١٠ إلى ٢٣٦ م²",
    name: "شقة ثلاث غرف نوم رحبة",
    description: "تصميم متسع يجمع بين صالون الاستقبال الفسيح وأجنحة النوم الخاصة مع إطلالات مباشرة على الأفنية.",
    highlights: ["3 غرف نوم وجناح رئيسي", "مساحة استقبال وضيافة رحبة", "إطلالة مباشرة على الفناء"],
  },
  {
    id: "type-2",
    type: "نموذج 2",
    bedrooms: 3,
    area: "١٧٦ إلى ١٩٨ م²",
    name: "شقة ثلاث غرف نوم متوازنة",
    description: "توزيع هندسي ذكي يفصل بين أجنحة النوم الهادئة ومساحات المعيشة المشتركة مع تهوية طبيعية.",
    highlights: ["3 غرف نوم", "فصل تام بين المعيشة والنوم", "تهوية وإضاءة طبيعية"],
  },
  {
    id: "type-3",
    type: "نموذج 3",
    bedrooms: 3,
    area: "١٨٠ إلى ٢٠٩ م²",
    name: "شقة ثلاث غرف نوم مشمسة",
    description: "توجيه مدروس للاستفادة من ضوء الشمس النهاري مع اتصال سلس بين المطبخ والشرفة العائلية.",
    highlights: ["3 غرف نوم", "معيشة موجهة للضوء الطبيعي", "شرفة عائلية خاصة"],
  },
  {
    id: "type-4",
    type: "نموذج 4",
    bedrooms: 2,
    area: "١٣٦ إلى ١٥٢ م²",
    name: "شقة غرفتا نوم عصرية",
    description: "توزيع عملي يستثمر كل متر مربع بعناية ليلائم متطلبات الحياة العصرية والأسر الحديثة.",
    highlights: ["غرفتا نوم", "مساحة معيشة مفتوحة", "استغلال مثالي للمساحات"],
  },
  {
    id: "type-5",
    type: "نموذج 5",
    bedrooms: 2,
    area: "١٢٧٫٥ إلى ١٥٦ م²",
    name: "شقة غرفتا نوم مريحة",
    description: "تصميم يحقق أعلى درجات الخصوصية والاستقلالية مع وفرة الضوء الطبيعي وجاهزية الأنظمة الذكية.",
    highlights: ["غرفتا نوم", "إضاءة نهارية طبيعية", "جاهزية المنازل الذكية"],
  },
];

export const projects: Project[] = [
  {
    slug: "rawasin",
    name: "Rawasin",
    categories: ["mixed-use", "residential", "commercial"],
    image: asset("/images/rawasin/compound-masterplan.webp"),
    images: {
      overview: asset("/images/rawasin/compound-facade.webp"),
      lifestyle: [
        asset("/images/rawasin/compound-courtyard.webp"),
        asset("/images/rawasin/compound-clubhouse.webp"),
        asset("/images/rawasin/compound-mosque.webp"),
      ],
      gallery: [
        ...residentialGallery,
        asset("/images/rawasin/compound-clubhouse.webp"),
        asset("/images/rawasin/compound-mosque.webp"),
        asset("/images/rawasin/mall-day-exterior.webp"),
        asset("/images/rawasin/mall-night-plaza.webp"),
      ],
    },
    masterPlan: { image: asset("/images/rawasin/compound-masterplan.webp") },
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
          body: "Life in Rawasin revolves around peaceful central courtyards, green rooftops, a five-level clubhouse with a rooftop padel court, and complete smart infrastructure powered by Telecom Egypt (WE).",
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
              "Mixed-use destination: retail, dining, 22 clinic units, medical laboratories, health clubs and rooftop leisure.",
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
          body: "تمتد الحياة في رواسين عبر الأفنية المشتركة والأسطح الخضراء والنادي الاجتماعي متعدد الطوابق مع ملعب بادل على السطح، وبنية اتصالات ذكية متكاملة بالشراكة مع المصرية للاتصالات WE.",
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
              "وجهة تجارية وطبية متكاملة: محال تجارية، مطاعم، 22 عيادة، معامل طبية، وصالات لياقة بدنية.",
          },
        ],
        models: rawasinModelsAr,
      },
    },
  },
  {
    slug: "dama-residence",
    name: "DAMA Residence",
    categories: ["residential"],
    image: asset("/images/dama-twin-residences.png"),
    images: {
      overview: asset("/images/dama-twin-residences.png"),
      lifestyle: [asset("/images/dama-courtyard-living.jpg"), asset("/images/dama-lobby-entrance-c1.png")],
      gallery: [
        asset("/images/dama-twin-residences.png"),
        asset("/images/dama-lobby-entrance-c1.png"),
        asset("/images/dama-courtyard-living.jpg"),
      ],
    },
    copy: {
      en: {
        location: "Details to be announced",
        summary:
          "A residential development in the DAMA portfolio. Approved project information will be published here.",
        intro:
          "A residential development in the DAMA portfolio. We publish project details only once they have been confirmed by DAMA.",
        overview: {
          titleLines: ["A DAMA", "*Residential Address*"],
          paragraphs: [
            "DAMA Residence is part of DAMA Development's portfolio. Approved information about its location, unit types, facilities and status will be published here once confirmed.",
            "In the meantime, our team can answer general questions about the development.",
          ],
        },
        facts: [],
        amenities: [],
        components: [],
      },
      ar: {
        location: "التفاصيل قيد الاعتماد",
        summary: "مشروع سكني ضمن محفظة داما. سيتم نشر المعلومات المعتمدة هنا فور توفرها.",
        intro: "مشروع سكني ضمن محفظة داما للتطوير العقاري. ننشر تفاصيل المشروعات بعد اعتمادها رسميًا فقط.",
        overview: {
          titleLines: ["عنوان سكني", "*من داما*"],
          paragraphs: [
            "مشروع داما ريزيدنس جزء من محفظة داما للتطوير العقاري. سيتم نشر المعلومات المعتمدة حول الموقع وأنواع الوحدات والمرافق هنا فور تأكيدها.",
            "في هذه الأثناء، يمكن لفريقنا الإجابة عن الاستفسارات العامة المتعلقة بالمشروع.",
          ],
        },
        facts: [],
        amenities: [],
        components: [],
      },
    },
  },
  {
    slug: "dama-view",
    name: "DAMA View",
    categories: ["residential"],
    image: asset("/images/dama-jacaranda-hero.jpg"),
    images: {
      overview: asset("/images/dama-jacaranda-hero.jpg"),
      lifestyle: [asset("/images/dama-courtyard-living.jpg"), asset("/images/dama-lobby-entrance-c1.png")],
      gallery: [
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
    },
    copy: {
      en: {
        location: "Details to be announced",
        summary:
          "A residential development in the DAMA portfolio. Approved project information will be published here.",
        intro:
          "A residential development in the DAMA portfolio. We publish project details only once they have been confirmed by DAMA.",
        overview: {
          titleLines: ["A DAMA", "*Viewpoint*"],
          paragraphs: [
            "DAMA View is part of DAMA Development's portfolio. Approved information about its location, unit types, facilities and status will be published here once confirmed.",
            "In the meantime, our team can answer general questions about the development.",
          ],
        },
        facts: [],
        amenities: [],
        components: [],
      },
      ar: {
        location: "التفاصيل قيد الاعتماد",
        summary: "مشروع سكني ضمن محفظة داما. سيتم نشر المعلومات المعتمدة هنا فور توفرها.",
        intro: "مشروع سكني ضمن محفظة داما للتطوير العقاري. ننشر تفاصيل المشروعات بعد اعتمادها رسميًا فقط.",
        overview: {
          titleLines: ["إطلالة سكنية", "*من داما*"],
          paragraphs: [
            "مشروع داما فيو جزء من محفظة داما للتطوير العقاري. سيتم نشر المعلومات المعتمدة حول الموقع وأنواع الوحدات والمرافق هنا فور تأكيدها.",
            "في هذه الأثناء، يمكن لفريقنا الإجابة عن الاستفسارات العامة المتعلقة بالمشروع.",
          ],
        },
        facts: [],
        amenities: [],
        components: [],
      },
    },
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  const canonical = legacyProjectSlugs[slug] || slug;
  return projects.find((p) => p.slug === canonical);
}

export function availableCategories(): ProjectCategory[] {
  return ["residential", "commercial", "mixed-use"];
}

export const legacyProjectSlugs: Record<string, ProjectSlug> = {
  rwasin: "rawasin",
};
