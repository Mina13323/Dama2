/**
 * Project portfolio — single source of truth for development content.
 *
 * CONTENT POLICY
 * --------------
 * Only facts confirmed in the official `Rawasin Mall` brochure (as quoted in
 * the project brief) are published here. Fields that DAMA has not approved —
 * unit counts, land areas for residential projects, prices, delivery dates,
 * availability and status — are deliberately left empty. Components render
 * only the sections for which data exists, so no placeholder facts ever reach
 * a visitor.
 *
 * Hierarchy: DAMA Developments -> Main Project -> Project Components.
 * Rawasin Mall is a *component* of Rawasin, not a separate development.
 *
 * There is no CMS/API yet; replace getProjects()/getProject() with a CMS call
 * later without touching page templates.
 */
import type { Locale } from "./index";

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
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  categories: ProjectCategory[];
  image: string;
  images: { overview: string; lifestyle: string[]; gallery: string[] };
  masterPlan?: { image: string; pdf?: string };
  /** Search link only. Exact plot coordinates have not been supplied. */
  mapUrl?: string;
  copy: Localized<ProjectCopy>;
}

export const projects: Project[] = [
  {
    slug: "rawasin",
    name: "Rawasin",
    categories: ["mixed-use", "residential", "commercial"],
    image: asset("/images/rawasin-aerial-masterplan.jpg"),
    images: {
      overview: asset("/images/rawasin-aerial.webp"),
      lifestyle: [
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
      gallery: [
        asset("/images/rawasin-aerial-masterplan.jpg"),
        asset("/images/rawasin-aerial.webp"),
        asset("/images/dama-jacaranda-hero.jpg"),
        asset("/images/dama-courtyard-living.jpg"),
        asset("/images/dama-lobby-entrance-c1.png"),
      ],
    },
    masterPlan: { image: asset("/images/rawasin-aerial-masterplan.jpg") },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=New+Sohag%2C+Sohag%2C+Egypt",
    copy: {
      en: {
        location: "New Sohag, Upper Egypt",
        summary:
          "A development in New Sohag bringing homes, services and modern living together, with Rawasin Mall as its mixed-use destination.",
        intro:
          "Rawasin introduces a new standard of living in Sohag, combining quality and design with an authentic Egyptian identity.",
        overview: {
          titleLines: ["A New Standard", "of *Living in Sohag*"],
          paragraphs: [
            "DAMA Development brings ambition and vision to create refined urban communities in Upper Egypt. Projects such as Rawasin introduce a new standard of living in Sohag, combining quality and design with an authentic Egyptian identity.",
            "Rawasin Mall is located within Rawasin, bringing homes, services and modern living together. It is a mixed-use destination bringing lifestyle, healthcare, shopping and entertainment together in one place.",
          ],
        },
        lifestyle: {
          titleLines: ["Everyday Life,", "*Thoughtfully Connected*"],
          body: "Within Rawasin, the mall brings everyday essentials, retail, dining, healthcare and fitness close to home. These facilities belong to Rawasin Mall — explore the dedicated destination page for the full floor-by-floor experience.",
        },
        locationNote:
          "Rawasin Mall is strategically located in the southern expansion of New Sohag, with easy access to key destinations. Exact plot coordinates and travel times will be published once confirmed by DAMA.",
        facts: [
          { icon: "location", label: "Location", value: "New Sohag, Upper Egypt" },
          { icon: "type", label: "Destination", value: "Rawasin Mall" },
          { icon: "units", label: "Mall Levels", value: "Basement + Ground + 3 Floors" },
          { icon: "green", label: "Commercial Land¹", value: "6,280 m²" },
        ],
        amenities: [],
        components: [
          {
            name: "Rawasin Mall",
            href: "mall",
            description:
              "Mixed-use commercial and medical destination: retail, restaurants, cafés, clinics, medical laboratories, gyms and more.",
          },
        ],
      },
      ar: {
        location: "سوهاج الجديدة، صعيد مصر",
        summary:
          "مشروع في سوهاج الجديدة يجمع بين المساكن والخدمات والحياة العصرية، ويضم مول رواسين كوجهة متعددة الاستخدامات.",
        intro:
          "يقدّم رواسين معيارًا جديدًا للحياة في سوهاج، يجمع بين الجودة والتصميم وهوية مصرية أصيلة.",
        overview: {
          titleLines: ["معيار جديد", "*للحياة في سوهاج*"],
          paragraphs: [
            "تحمل داما للتطوير العقاري طموحًا ورؤية لإنشاء مجتمعات عمرانية راقية في صعيد مصر. وتقدّم مشروعات مثل رواسين معيارًا جديدًا للحياة في سوهاج، تجمع فيه بين الجودة والتصميم وهوية مصرية أصيلة.",
            "يقع مول رواسين داخل مشروع رواسين، ليجمع بين المساكن والخدمات والحياة العصرية. وهو وجهة متعددة الاستخدامات تجمع بين نمط الحياة والرعاية الصحية والتسوق والترفيه في مكان واحد.",
          ],
        },
        lifestyle: {
          titleLines: ["حياة يومية", "*متصلة بعناية*"],
          body: "يقرّب المول داخل رواسين بين الاحتياجات اليومية والتسوق والمطاعم والرعاية الصحية واللياقة البدنية. هذه المرافق خاصة بمول رواسين — يمكن استكشاف التفاصيل الكاملة لكل طابق في صفحة الوجهة المخصصة.",
        },
        locationNote:
          "يقع مول رواسين في موقع استراتيجي بالتوسع الجنوبي لسوهاج الجديدة، مع سهولة الوصول إلى الوجهات الرئيسية. سيتم نشر إحداثيات الموقع بدقة وأوقات الوصول بعد اعتمادها من داما.",
        facts: [
          { icon: "location", label: "الموقع", value: "سوهاج الجديدة، صعيد مصر" },
          { icon: "type", label: "الوجهة", value: "مول رواسين" },
          { icon: "units", label: "أدوار المول", value: "بدروم + أرضي + 3 أدوار" },
          { icon: "green", label: "الأرض التجارية¹", value: "٦٬٢٨٠ م²" },
        ],
        amenities: [],
        components: [
          {
            name: "مول رواسين",
            href: "mall",
            description:
              "وجهة تجارية وطبية متعددة الاستخدامات: محال تجارية ومطاعم وكافيهات وعيادات ومعامل طبية وصالات رياضية وغيرها.",
          },
        ],
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
            "داما ريزيدنس ضمن محفظة مشروعات داما للتطوير العقاري. سيتم نشر المعلومات المعتمدة عن الموقع وأنواع الوحدات والمرافق والحالة هنا فور تأكيدها.",
            "يمكن لفريقنا في الوقت الحالي الإجابة عن الاستفسارات العامة حول المشروع.",
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
    image: asset("/images/project-view.jpg"),
    images: {
      overview: asset("/images/project-view.jpg"),
      lifestyle: [asset("/images/hero-dama.jpg")],
      gallery: [asset("/images/project-view.jpg"), asset("/images/hero-dama.jpg")],
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
          titleLines: ["عنوان سكني", "*من داما*"],
          paragraphs: [
            "داما فيو ضمن محفظة مشروعات داما للتطوير العقاري. سيتم نشر المعلومات المعتمدة عن الموقع وأنواع الوحدات والمرافق والحالة هنا فور تأكيدها.",
            "يمكن لفريقنا في الوقت الحالي الإجابة عن الاستفسارات العامة حول المشروع.",
          ],
        },
        facts: [],
        amenities: [],
        components: [],
      },
    },
  },
];

/** Legacy URLs are kept working: /projects/rwasin -> /projects/rawasin. */
export const legacyProjectSlugs: Record<string, ProjectSlug> = { rwasin: "rawasin" };

export const getProjects = (): Project[] => projects;
export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug) ?? projects.find((p) => p.slug === legacyProjectSlugs[slug]);

export const availableCategories = (): ProjectCategory[] => {
  const order: ProjectCategory[] = ["residential", "commercial", "mixed-use"];
  const present = new Set(projects.flatMap((p) => p.categories));
  return order.filter((c) => present.has(c));
};
