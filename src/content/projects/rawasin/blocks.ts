/**
 * Rawasin block sets: every structured section of the Rawasin hub, residential
 * and mall pages. Facts come from the four source documents listed in
 * src/content/page-content.ts and the verified floor schedules in ./mall.
 */
import type { Locale } from "../../index";
import { getDictionary } from "../../index";
import { tr, type Block, type BlockLink, type BlockSet, type Cell, type Tile } from "../../blocks";
import { rawasinLink } from "./links";
import { brochureImg, mall, mallAll, res, residentialAll } from "../../assets";
import { rawasinProject } from "./project";
import { rawasinMall, type FloorId } from "./mall";
import { rawasinStory } from "./story";

/* ------------------------------------------------------------------ */
/* Figures derived from the verified floor schedules                    */
/* ------------------------------------------------------------------ */
const enFloors = rawasinMall.en.floors.list;
const area = (s: string) => parseFloat(s);
const rows = (id: FloorId, category: string) => enFloors.find((f) => f.id === id)!.units.filter((u) => u.category === category);
const range = (rs: { area: string }[]) => {
  const v = rs.map((r) => area(r.area));
  return { min: Math.min(...v), max: Math.max(...v), n: v.length };
};
const retailGround = range(rows("ground", "Retail"));
const retailFirst = range(rows("first", "Retail"));
const retailAll = { n: retailGround.n + retailFirst.n, min: Math.min(retailGround.min, retailFirst.min), max: Math.max(retailGround.max, retailFirst.max) };
const clinics = range(rows("second", "Clinic"));

const MALL = {
  land: "6,280 m²",
  frontage: "123 m",
};


/* ------------------------------------------------------------------ */
/* Shared pieces                                                        */
/* ------------------------------------------------------------------ */
function compoundFigures(l: Locale) {
  const t = tr(l);
  return [
    { label: t("Community area", "مساحة المجتمع"), value: t("7.5 feddans", "7.5 فدان") },
    { label: t("Residential buildings", "مبانٍ سكنية"), value: "7" },
    { label: t("Homes", "وحدة سكنية"), value: "196" },
    { label: t("Apartment layouts", "نماذج شقق"), value: "5", note: t("Two and three bedrooms, 127.5 to 236 m²", "غرفتا نوم وثلاث غرف، من 127.5 إلى 236 م²") },
  ];
}

function enquiry(l: Locale, id: string, kind: "residential" | "commercial" | "medical" | "retail" | "partner"): Block {
  const t = tr(l);
  const c = {
    residential: {
      eyebrow: t("Enquiries", "الاستفسارات"),
      lines: [t("Ask about", "اسأل عن"), t("a *Rawasin home*", "*منزلك في رواسين*")],
      body: t("Availability, prices and payment plans are not published on this website. The DAMA sales team will share current, approved information.", "لا تُنشر توفر الوحدات والأسعار وخطط السداد على هذا الموقع. يشاركك فريق مبيعات داما المعلومات المعتمدة الحالية."),
      label: t("Contact Sales", "تواصل مع المبيعات"),
    },
    commercial: {
      eyebrow: t("Leasing & investment enquiries", "استفسارات التأجير والاستثمار"),
      lines: [t("Talk to the team about", "تحدث مع الفريق عن"), t("*Rawasin Mall*", "*مول رواسين*")],
      body: t("Availability, prices, payment plans, ownership and rental arrangements are not published here. Contact DAMA for current, approved information on retail and medical units.", "لا تُنشر هنا توفر الوحدات والأسعار وخطط السداد وترتيبات الملكية والإيجار. تواصل مع داما للحصول على المعلومات المعتمدة الحالية عن الوحدات التجارية والطبية."),
      label: t("Enquire about the mall", "استفسر عن المول"),
    },
    retail: {
      eyebrow: t("Retail enquiries", "استفسارات الوحدات التجارية"),
      lines: [t("Find the right", "اعثر على"), t("*retail unit*", "*الوحدة التجارية المناسبة*")],
      body: t("Tell the DAMA team which activity and size you have in mind. Availability and commercial terms are shared directly, as they are not published here.", "أخبر فريق داما بالنشاط والمساحة التي تفكر فيها. تُشارك التوفر والشروط التجارية مباشرة لأنها غير منشورة هنا."),
      label: t("Enquire about retail units", "استفسر عن الوحدات التجارية"),
    },
    medical: {
      eyebrow: t("Medical enquiries", "الاستفسارات الطبية"),
      lines: [t("Plan your practice at", "خطط لعيادتك في"), t("*Rawasin Mall*", "*مول رواسين*")],
      body: t("For clinics, laboratories or the obstetrics and gynaecology department, contact the DAMA team. Availability and commercial terms are not published here.", "للعيادات أو المعامل أو قسم النساء والتوليد، تواصل مع فريق داما. التوفر والشروط التجارية غير منشورة هنا."),
      label: t("Enquire about medical units", "استفسر عن الوحدات الطبية"),
    },
    partner: {
      eyebrow: t("Partnerships", "الشراكات"),
      lines: [t("Interested in", "مهتم بـ"), t("*working with DAMA?*", "*العمل مع داما؟*")],
      body: t("For partnership and operator enquiries, contact the DAMA team.", "لاستفسارات الشراكة والتشغيل، تواصل مع فريق داما."),
      label: t("Contact the team", "تواصل مع الفريق"),
    },
  }[kind];
  return { kind: "cta", id, eyebrow: c.eyebrow, lines: c.lines, body: c.body, primary: { label: c.label, link: { key: "contact" } }, tone: "light" };
}

/* ------------------------------------------------------------------ */
/* Corporate                                                            */
export function rawasinHubBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const p = rawasinProject;
  return {
    positioning: {
      kind: "split", id: "positioning", eyebrow: t("Rawasin", "رواسين"), lines: [t("Solid by Name,", "ثابت زي اسمه،"), t("*Timeless by Nature*", "*وأصيل زي روحه*")],
      body: t("Rawasin is a mixed-use development bringing homes, services and shopping together, so everyday needs are close to home. It has two branches, a residential compound and Rawasin Mall, which complete each other within one community.", "رواسين مشروع متعدد الاستخدامات يجمع السكن والخدمات والتسوق، لتبقى احتياجات اليوم قريبة من البيت. وله فرعان، كمبوند سكني ورواسين مول، يكمل كل منهما الآخر داخل مجتمع واحد."),
      points: [
        t("Homes arranged around planted courtyards", "بيوت موزعة حول أفنية مزروعة"),
        t("Façades of Hashemi stone, shaped by light and shadow", "واجهات من الحجر الهاشمي تشكّلها الظلال والضوء"),
        t("Privacy of the home with places to meet and everyday services", "خصوصية البيت مع مساحات للقاء وخدمات يومية"),
      ],
      images: [R.facadeCourtyard, B.courtyardGarden],
    },
    figures: {
      kind: "facts", id: "key-figures", eyebrow: t("Key figures", "أرقام رئيسية"), lines: [t("Rawasin", "رواسين"), t("*in numbers*", "*بالأرقام*")], tone: "light",
      items: [
        ...compoundFigures(l),
        { label: t("Mall levels", "مستويات المول"), value: "5", note: t("Basement, ground and three upper floors", "بدروم ودور أرضي وثلاثة أدوار علوية") },
        { label: t("Mall land area", "مساحة أرض المول"), value: MALL.land.replace("m²", t("m²", "م²")) },
      ],
      footnote: t("Mall figures describe Rawasin Mall only; residential figures describe the compound.", "أرقام المول تخص مول رواسين فقط، وأرقام السكني تخص الكمبوند."),
    },
    community: {
      kind: "cards", id: "community", eyebrow: t("Within the community", "داخل المجتمع"), lines: [t("Everything in", "كل شيء في"), t("*one place*", "*مكان واحد*")],
      body: t("Rawasin is a mixed-use development: homes, services and shopping together, so daily needs are close to home.", "رواسين مشروع متعدد الاستخدامات يجمع السكن والخدمات والتسوق، لتبقى احتياجات اليوم قريبة من البيت."),
      items: [
        { title: t("Residential buildings", "المباني السكنية"), body: t("Seven buildings with 196 homes of two or three bedrooms.", "سبعة مبانٍ تضم 196 وحدة من غرفتين أو ثلاث غرف نوم."), link: { ...rawasinLink("residential-apartments"), label: t("Apartments", "الشقق") } },
        { title: t("Rawasin Mall", "رواسين مول"), body: t("Shopping, healthcare, dining and leisure across five levels.", "تسوق ورعاية صحية وطعام وترفيه على خمسة مستويات."), link: { ...rawasinLink("mall"), label: t("Mall overview", "نظرة عامة على المول") } },
        { title: t("Rawasin Mosque", "مسجد رواسين"), body: t("A place for daily prayer close to the homes, in the project's stone architecture.", "مكان للصلاة قريب من البيوت، بلغة الحجر المعمارية للمشروع."), link: { ...rawasinLink("residential-lifestyle"), label: t("Lifestyle & amenities", "نمط الحياة والمرافق") } },
        { title: t("Clubhouse", "النادي الاجتماعي"), body: t("Learning, work, meetings, reading, fitness and dining, with a padel court on the roof.", "تعلّم وعمل واجتماعات وقراءة ولياقة وطعام، مع ملعب بادل على السطح."), link: { ...rawasinLink("residential-lifestyle"), label: t("Lifestyle & amenities", "نمط الحياة والمرافق") } },
        { title: t("Parking and nursery", "المواقف والحضانة"), body: t("Underground parking serves the residential buildings, and a nursery sits within the project.", "مواقف تحت الأرض تخدم المباني السكنية، وحضانة داخل المشروع."), link: { ...rawasinLink("residential-lifestyle"), label: t("Lifestyle & amenities", "نمط الحياة والمرافق") } },
        { title: t("Smart compound", "سمارت كمبوند"), body: t("Smart security and metering, solar-lit shared areas and fibre to every unit.", "أمن وعدادات ذكية وإنارة مشتركة بالطاقة الشمسية وألياف ضوئية لكل وحدة."), link: { ...rawasinLink("residential-lifestyle"), label: t("Smart living", "الحياة الذكية") } },
      ],
    },
    location: {
      kind: "split", id: "location", eyebrow: t("Location", "الموقع"), lines: [t("In the heart of", "في قلب"), t("*New Sohag*", "*سوهاج الجديدة*")],
      body: t("Rawasin sits in the southern expansion of New Sohag, on the New Airport Axis. The brochures list these destinations nearby.", "يقع رواسين في التوسعات الجنوبية لسوهاج الجديدة على محور المطار الجديد. ويذكر الكتيّبان هذه الوجهات في محيطه."),
      points: rawasinMall[l].location.destinations,
      image: R.aerial3,
      link: { ...rawasinLink("residential-location"), label: t("Location and master plan", "الموقع والمخطط العام") },
      reverse: true,
    },
    banner: { kind: "banner", id: "hub-banner", image: R.aerial2, priority: true },
    portraits: { kind: "mosaic", id: "hub-portraits", layout: "portraits", images: [B.courtyardPath, B.rooftop, B.lobby, B.mosque] },
    cta: enquiry(l, "enquire", "partner"),
  };
}

/* ------------------------------------------------------------------ */
/* Residential                                                          */
/* ------------------------------------------------------------------ */
const smartGroups = (l: Locale) => rawasinStory[l].smart.groups;

export function residentialBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  return {
    architecture: {
      kind: "split", id: "concept", eyebrow: t("Architectural concept", "الفكرة المعمارية"), lines: [t("Stone, courtyards", "الحجر والأفنية"), t("*and light*", "*والضوء*")],
      body: t("Stone, courtyards and patterned screens give Rawasin its architectural character. Buildings, windows and balconies are arranged together for privacy, daylight and natural ventilation.", "تمنح الحجارة والأفنية والحواجز المفرّغة رواسين طابعه المعماري، وتُنظَّم المباني والنوافذ والشرفات معًا لتحقيق الخصوصية وضوء النهار والتهوية الطبيعية."),
      points: [
        t("Hashemi stone façades, with 30 cm walls of two stone layers around an air cavity", "واجهات من الحجر الهاشمي، وحوائط بسمك 30 سم من طبقتي حجر بينهما فراغ هوائي"),
        t("Buildings at least 10 metres apart", "مسافة لا تقل عن 10 أمتار بين المباني"),
        t("Entrances, balconies and planted spaces share one architectural language", "المداخل والشرفات والمساحات المزروعة في لغة معمارية واحدة"),
      ],
      images: [R.facadeScreens, B.screenPassage],
      link: { ...rawasinLink("residential-architecture"), label: t("Architecture in detail", "العمارة بالتفصيل") },
    },
    lifestyle: {
      kind: "cards", id: "lifestyle-summary", eyebrow: t("Lifestyle & amenities", "نمط الحياة والمرافق"), lines: [t("Daily life", "حياة يومية"), t("*close to home*", "*قريبة من البيت*")], tone: "light",
      items: [
        { title: t("Courtyards and green rooftops", "الأفنية والأسطح الخضراء"), body: t("Planted courtyards, walkways and seating between the buildings, and open-air rooftops for planting and community activities.", "أفنية مزروعة وممرات وأماكن جلوس بين المباني، وأسطح مفتوحة للزراعة والأنشطة المجتمعية.") },
        { title: t("Clubhouse", "النادي الاجتماعي"), body: t("Classrooms, workspaces, meeting rooms, a gym, a library, a restaurant and a rooftop padel court.", "قاعات تعلّم ومساحات عمل وغرف اجتماعات وجيم ومكتبة ومطعم وملعب بادل على السطح.") },
        { title: t("Rawasin Mosque", "مسجد رواسين"), body: t("A place for prayer and reflection, close to the homes.", "مكان للصلاة والتأمل بالقرب من البيوت.") },
        { title: t("Services", "الخدمات"), body: t("Underground parking, wide entrances and lifts, a nursery, and Rawasin Mall for everyday shopping and healthcare.", "مواقف تحت الأرض ومداخل واسعة ومصاعد وحضانة، ومول رواسين للتسوق والرعاية الصحية.") },
      ],
      footnote: t("Full details are on the Lifestyle & Amenities page.", "التفاصيل الكاملة في صفحة نمط الحياة والمرافق."),
    },
    smart: {
      kind: "groups", id: "smart-summary", eyebrow: t("Smart living", "الحياة الذكية"), lines: [t("A smart compound,", "سمارت كمبوند،"), t("*confirmed and optional*", "*مؤكد واختياري*")],
      body: t("Project-wide infrastructure is separated here from smart-home features that depend on the unit specification and package.", "نفصل هنا بين البنية الذكية على مستوى المشروع والخدمات التي تتوقف على تجهيز الوحدة والباقة."),
      groups: [
        { title: t("Project infrastructure", "بنية المشروع"), tag: t("Part of the project", "ضمن المشروع"), items: [...smartGroups(l)[0].items.slice(0, 2), smartGroups(l)[1].items[0], smartGroups(l)[3].items[0]] },
        { title: t("Smart Home Ready", "جاهزية المنزل الذكي"), tag: t("Depends on unit package", "حسب تجهيز الوحدة والباقة"), tagTone: "pending", items: smartGroups(l)[2].items },
      ],
      footnote: t("See the Lifestyle & Amenities page for the complete list.", "القائمة الكاملة في صفحة نمط الحياة والمرافق."),
    },
    masterplan: {
      kind: "split", id: "masterplan-summary", eyebrow: t("Master plan highlights", "أبرز ملامح المخطط العام"), lines: [t("One plan,", "مخطط واحد،"), t("*one community*", "*ومجتمع واحد*")],
      body: t("Planted courtyards and walkways connect the home entrances with shared spaces, while underground parking serves the residential buildings.", "تربط الأفنية المزروعة والممرات بين مداخل البيوت والمساحات المشتركة، مع مواقف سيارات تحت الأرض لخدمة المباني السكنية."),
      points: [t("Residential buildings", "المباني السكنية"), t("Rawasin Mall", "رواسين مول"), t("Rawasin Mosque", "مسجد رواسين"), t("Clubhouse", "النادي الاجتماعي"), t("Underground parking", "مواقف السيارات تحت الأرض")],
      image: R.masterTop,
      link: { ...rawasinLink("residential-location"), label: t("Location and master plan", "الموقع والمخطط العام") },
      reverse: true,
    },
    duo: { kind: "mosaic", id: "residential-duo", layout: "duo", images: [R.facadeCourtyard, B.rooftop] },
    apartments: apartmentsTable(l, "apartments-summary", undefined, true),
  };
}

function apartmentsTable(l: Locale, id: string, highlight: string | undefined, withIntro = false): Block {
  const t = tr(l);
  const models = rawasinProject.copy[l].models!;
  return {
    kind: "table", id, eyebrow: t("Apartment types", "أنواع الشقق"), lines: [t("Five layouts,", "خمسة نماذج،"), t("*compared*", "*مقارنة*")], tone: withIntro ? "light" : "white",
    body: t("Rawasin offers five apartment layouts of two or three bedrooms, from 127.5 to 236 m².", "يقدّم رواسين خمسة نماذج شقق من غرفتين أو ثلاث غرف نوم بمساحات من 127.5 إلى 236 م²."),
    head: [t("Type", "النموذج"), t("Bedrooms", "غرف النوم"), t("Area range", "نطاق المساحة"), t("Details", "التفاصيل")],
    rows: models.map((m) => [m.type, String(m.bedrooms), m.area, { text: t("View plan", "عرض المخطط"), link: { ...rawasinLink("residential-apartment", m.id) } }]),
    highlight: highlight ? models.findIndex((m) => m.id === highlight) : undefined,
    footnote: t("Areas are the ranges published in the Rawasin Compound brochure.", "المساحات هي النطاقات المنشورة في كتيّب كمبوند رواسين."),
  };
}

export function architectureBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const B = brochureImg(l);
  const story = rawasinStory[l].architecture;
  const [wallStat, distanceStat, homesStat, areaStat] = story.stats;
  const [courtyards, privacy, daylight, , solar, comfort] = story.points;
  const plain = (lines: string[]) => lines.join(" ").replace(/\*/g, "");
  return {
    identity: {
      kind: "bento", id: "identity", eyebrow: story.eyebrow, lines: story.titleLines, body: story.body,
      tiles: [
        { t: "stat", value: wallStat.value, label: wallStat.label, tone: "red" },
        { t: "stat", value: distanceStat.value, label: distanceStat.label },
        { t: "image", image: R.facadeJacaranda, span: "big" },
        { t: "stat", value: homesStat.value, label: homesStat.label, tone: "dark" },
        { t: "stat", value: areaStat.value, label: areaStat.label },
        {
          t: "text", span: "wide",
          title: plain([t("Seven buildings,", "سبعة مبانٍ،"), t("*196 homes*", "*و196 وحدة*")]),
          body: t("Set across 7.5 feddans, Rawasin is an integrated community of seven residential buildings with 196 homes, in five apartment layouts of two or three bedrooms.", "على مساحة 7.5 فدان، يتشكل رواسين كمجتمع متكامل من 7 مبانٍ سكنية تضم 196 وحدة، بخمسة نماذج شقق من غرفتين أو ثلاث غرف نوم."),
          points: [
            t("Buildings stand at least 10 metres apart", "تفصل بين المباني مسافات لا تقل عن 10 أمتار"),
            t("Wide entrances and lifts connect with the underground parking", "مداخل واسعة ومصاعد متصلة بمواقف السيارات تحت الأرض"),
            t("Mall, mosque and clubhouse sit within the same plan", "المول والمسجد والنادي الاجتماعي ضمن المخطط نفسه"),
          ],
          link: { ...rawasinLink("residential-apartments"), label: t("See the apartment types", "اطّلع على أنواع الشقق") },
        },
        { t: "image", image: R.facadeScreens, span: "wide" },
        { t: "text", tone: "sand", span: "wide", body: t("The project is developed under the architectural direction of Dar Arafa Architecture, led by architect Walid Arafa.", "يُطوَّر المشروع تحت التوجيه المعماري لمكتب دار عرفة للعمارة بقيادة المهندس وليد عرفة.") },
      ],
    },
    between: {
      kind: "bento", id: "between", eyebrow: t("Courtyards & walkways", "الأفنية والممرات"), lines: [t("Life between", "حياة بين"), t("*the buildings*", "*المباني*")], tone: "white",
      body: t("The courtyard carries a familiar idea from Egyptian architecture into daily life at Rawasin.", "يستحضر الفناء فكرة مألوفة في العمارة المصرية ويمنحها دورًا جديدًا في الحياة داخل رواسين."),
      tiles: [
        { t: "image", image: B.courtyardPath, span: "tall" },
        { t: "text", title: courtyards.title, body: courtyards.body },
        {
          t: "text", span: "wide", tone: "sand",
          title: t("Walkways and approach", "الممرات والمداخل"),
          body: t("Planted pathways connect the homes with shared courtyards and seating areas, passing greenery and places to pause and meet neighbours.", "تربط الممرات المزروعة بين البيوت والأفنية المشتركة وأماكن الجلوس، فتمر بجوار الخضرة وأماكن التوقف ولقاء الجيران."),
          points: [t("Hashemi stone, light and shadow at the building entrances", "الحجر الهاشمي والضوء والظل عند مداخل المباني"), t("Wide entrances and lifts link to the underground parking", "مداخل واسعة ومصاعد تتصل بمواقف السيارات تحت الأرض")],
        },
        { t: "text", title: privacy.title, body: privacy.body, points: [t("Openings positioned to limit direct views between homes", "فتحات موزعة للحد من الإطلالات المباشرة بين الوحدات"), t("Patterned screens around balconies and openings", "حواجز مفرغة حول الشرفات والفتحات")] },
        { t: "text", title: daylight.title, body: daylight.body, points: [t("Living spaces oriented for natural light and ventilation", "مساحات معيشة موجهة للضوء الطبيعي والتهوية"), t("Open courtyards let light reach the surrounding façades", "أفنية مفتوحة تسمح بوصول الضوء إلى الواجهات المحيطة")] },
        {
          t: "layers", span: "wide", tone: "dark",
          title: plain([t("A wall built for", "حائط مصمم من أجل"), t("*comfort*", "*الراحة*")]),
          body: comfort.body,
          layers: [
            { value: t("12 cm", "12 سم"), label: t("Outer stone layer", "طبقة الحجر الخارجية") },
            { value: t("6 cm", "6 سم"), label: t("Air cavity", "الفراغ الهوائي") },
            { value: t("12 cm", "12 سم"), label: t("Inner stone layer", "طبقة الحجر الداخلية") },
          ],
          note: t("Total wall thickness: 30 cm. The façades take their texture from the stone, its joints and the shadows cast through the day.", "السمك الإجمالي للحائط: 30 سم. تأخذ الواجهات ملمسها من الحجر وفواصله والظلال التي تتبدل على مدار اليوم."),
        },
        { t: "image", image: R.screenPassage },
        {
          t: "text", span: "full", image: R.aerial4,
          title: plain([t("Light from", "طاقة من"), t("*the sun*", "*الشمس*")]),
          body: solar.body,
          link: { ...rawasinLink("residential-lifestyle"), label: t("Smart living and amenities", "الحياة الذكية والمرافق") },
        },
      ],
    },
    rail: { kind: "rail", id: "gallery", images: residentialAll(l) },
  };
}

export function lifestyleBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const M = mall(l);
  const B = brochureImg(l);
  const plain = (lines: string[]) => lines.join(" ").replace(/\*/g, "");
  return {
    together: {
      kind: "bento", id: "shared-life", eyebrow: t("Community life", "الحياة المجتمعية"), lines: [t("Time that", "وقت"), t("*brings us together*", "*يجمعنا*")], tone: "white",
      body: t("A seat in the shade, a conversation on the way home, an afternoon with family: the shared spaces are part of living at Rawasin.", "جلسة في الظل، أو حديث في طريق العودة، أو عصرية مع العائلة: المساحات المشتركة جزء من الحياة في رواسين."),
      tiles: [
        { t: "image", image: B.courtyardPath, span: "tall" },
        { t: "text", title: t("Planted courtyards", "الأفنية المزروعة"), body: t("Courtyards with paths and seating let neighbours share space close to their homes, with views toward the stone buildings.", "أفنية بممرات وأماكن جلوس تتيح للجيران مساحات يتشاركونها بالقرب من منازلهم، مع إطلالات على المباني الحجرية.") },
        { t: "image", image: B.rooftop, span: "big" },
        { t: "text", tone: "sand", title: t("Walking areas", "ممرات المشي"), body: t("Planted walkways link the building entrances with the shared spaces, with places to sit along the way.", "ممرات مزروعة تربط مداخل المباني بالمساحات المشتركة مع أماكن للجلوس على طول الطريق.") },
        { t: "image", image: B.lobby },
        { t: "text", tone: "red", title: t("Green rooftops", "الأسطح الخضراء"), body: t("Open-air seating, planting areas and spaces for community activities above the courtyards, under open sky.", "جلسات في الهواء الطلق ومساحات للزراعة وللأنشطة المجتمعية فوق الأفنية تحت السماء المفتوحة.") },
      ],
    },
    access: {
      kind: "bento", id: "everyday-access", eyebrow: t("Everyday access", "سهولة الوصول اليومي"), lines: [t("Parking, lifts", "المواقف والمصاعد"), t("*and a nursery*", "*والحضانة*")], tone: "sand",
      body: t("Underground parking serves the residential buildings, and wide entrances and lifts support daily movement between the levels of each building. A nursery within the project adds a service for families with young children.", "تخدم مواقف السيارات تحت الأرض المباني السكنية، وتدعم المداخل الواسعة والمصاعد الحركة اليومية بين مستويات كل مبنى. وتضيف الحضانة داخل المشروع خدمة للأسر التي لديها أطفال في سن مبكرة."),
      tiles: [
        { t: "text", span: "wide", points: [t("Underground parking for the residential buildings", "مواقف تحت الأرض للمباني السكنية"), t("Wide entrances and lifts", "مداخل واسعة ومصاعد"), t("A nursery within the project", "حضانة داخل المشروع"), t("A waste management system for shared areas", "نظام لإدارة النفايات للمساحات المشتركة")] },
        { t: "image", image: B.masterTop, span: "big" },
        {
          t: "text", span: "big", image: M.dayFront,
          title: plain([t("Rawasin Mall,", "رواسين مول،"), t("*within the community*", "*داخل المجتمع*")]),
          body: t("The plan includes a supermarket and a pharmacy, and Rawasin Mall adds shops, restaurants, cafés, medical services, fitness and personal care, giving residents more than one destination for daily needs.", "يشمل المخطط سوبرماركت وصيدلية، ويضيف رواسين مول محلات ومطاعم ومقاهي وخدمات طبية ولياقة وعناية، ليمنح السكان أكثر من وجهة لتلبية احتياجاتهم."),
          link: { ...rawasinLink("mall"), label: t("Rawasin Mall overview", "نظرة عامة على مول رواسين") },
        },
      ],
    },
    cta: enquiry(l, "enquire", "residential"),
  };
}

export function apartmentsBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const B = brochureImg(l);
  return {
    figures: {
      kind: "bento", id: "apartment-figures", eyebrow: t("Apartments", "الشقق"), lines: [t("Homes for", "بيوت تناسب"), t("*different households*", "*أسرًا مختلفة*")],
      body: t("Rawasin's apartments come in five layouts. The plans balance everyday movement, shared living and privacy, so you can choose the size and arrangement that suits your family.", "تأتي شقق رواسين في خمسة نماذج، تراعي توزيعاتها حركة الاستخدام اليومي والعلاقة بين المعيشة وغرف النوم، لتختار المساحة والتقسيم الأنسب لأسرتك."),
      tiles: [
        { t: "stat", value: "5", label: t("Layouts", "النماذج"), tone: "red" },
        { t: "stat", value: t("2 or 3", "2 أو 3"), label: t("Bedrooms", "غرف النوم") },
        { t: "image", image: R.facadeRow, span: "big" },
        { t: "stat", value: t("127.5 – 236 m²", "127.5 – 236 م²"), label: t("Area range", "نطاق المساحة"), span: "wide" },
        { t: "stat", value: "196", label: `${t("Homes in the compound", "وحدة في الكمبوند")} · ${t("In 7 residential buildings", "في 7 مبانٍ سكنية")}`, tone: "dark" },
        { t: "image", image: B.lobby },
      ],
    },
    compare: {
      kind: "ranges", id: "compare", eyebrow: t("Apartment types", "أنواع الشقق"), lines: [t("Five layouts,", "خمسة نماذج،"), t("*compared*", "*مقارنة*")],
      body: t("Rawasin offers five apartment layouts of two or three bedrooms, from 127.5 to 236 m².", "يقدّم رواسين خمسة نماذج شقق من غرفتين أو ثلاث غرف نوم بمساحات من 127.5 إلى 236 م²."),
      unit: t("m²", "م²"),
      // Bar positions come from the English figures; labels keep each locale's published wording.
      rows: rawasinProject.copy[l].models!.map((m, i) => {
        const [min, max] = rawasinProject.copy.en.models![i].area.match(/[\d.]+/g)!.map(Number);
        return { label: m.type, count: { n: m.bedrooms, label: m.highlights[0] }, min, max, display: m.area, link: { ...rawasinLink("residential-apartment", m.id), label: t("View plan", "عرض المخطط") } };
      }),
      footnote: t("Areas are the ranges published in the Rawasin Compound brochure.", "المساحات هي النطاقات المنشورة في كتيّب كمبوند رواسين."),
    },
    finishing: {
      kind: "bento", id: "finishing", eyebrow: t("Finishing services", "خدمات التشطيب"), lines: [t("Finishing under", "تشطيب تحت"), t("*DAMA supervision*", "*إشراف داما*")], tone: "white", intro: { span: "big" },
      body: t(
        "Owners choose one of the approved finishing offices to discuss design, needs and budget. The office supervises the works under the standard materials and specifications DAMA approves, so the project's quality and identity stay consistent.",
        "يختار المالك أحد مكاتب التشطيب المعتمدة لمناقشة التصميم والاحتياجات والميزانية. ويشرف المكتب على الأعمال وفق الخامات والمواصفات الموحدة التي تعتمدها داما، للحفاظ على جودة المشروع وهويته.",
      ),
      tiles: [
        { t: "text", tone: "sand", title: "Kayan", body: t("Architecture and decoration: design coordination and finishing supervision.", "للعمارة والديكور: تنسيق التصميم والإشراف على التشطيب.") },
        { t: "text", tone: "sand", title: "MA + Partners", body: t("Design coordination and finishing supervision.", "تنسيق التصميم والإشراف على التشطيب.") },
        { t: "text", tone: "sand", title: "Salah Donqol", body: t("Engineering works: design coordination and finishing supervision.", "للأعمال الهندسية: تنسيق التصميم والإشراف على التشطيب.") },
        { t: "text", tone: "sand", title: "Tecno House", body: t("Architecture and decoration: design coordination and finishing supervision.", "للعمارة والديكور: تنسيق التصميم والإشراف على التشطيب.") },
      ],
      footnote: t("Standard materials cannot be changed per customer. Additional works or changes are requested at the owner's expense through a separate bill of quantities, approved by DAMA before execution.", "لا يُسمح بتغيير الخامات القياسية حسب رغبة كل عميل. تُنفَّذ الإضافات والتعديلات على نفقة المالك بمقايسة منفصلة تُعتمد من داما قبل التنفيذ."),
    },
    cta: enquiry(l, "enquire", "residential"),
  };
}

export function apartmentDetailBlocks(l: Locale, typeId: string): BlockSet {
  const t = tr(l);
  const models = rawasinProject.copy[l].models!;
  const idx = models.findIndex((m) => m.id === typeId);
  const current = models[idx];
  const nb = [models[idx - 1], models[idx + 1]].filter(Boolean);
  const table = apartmentsTable(l, "compare", typeId);
  return {
    compare: { ...table, body: t(`How ${current.type} compares with the other four layouts.`, `مقارنة ${current.type} بالنماذج الأربعة الأخرى.`) } as Block,
    context: {
      kind: "cards", id: "context", eyebrow: t("Keep exploring", "واصل الاستكشاف"), lines: [t("Other layouts and", "نماذج أخرى و"), t("*life at Rawasin*", "*الحياة في رواسين*")], tone: "light", cols: 3,
      items: [
        ...nb.map((m) => ({ tag: idx > models.indexOf(m) ? t("Previous layout", "النموذج السابق") : t("Next layout", "النموذج التالي"), title: `${m.type} · ${m.bedrooms}${t(" bedrooms", " غرف نوم")}`, body: m.area, link: { ...rawasinLink("residential-apartment", m.id), label: t("View plan", "عرض المخطط") } })),
        { title: t("Living at Rawasin", "الحياة في رواسين"), body: t("Courtyards, clubhouse, mosque and smart infrastructure around the home. Smart-home controls depend on the unit specification and package.", "أفنية ونادٍ اجتماعي ومسجد وبنية ذكية حول البيت. وتتوقف إمكانات المنزل الذكي على تجهيز الوحدة والباقة."), link: { ...rawasinLink("residential-lifestyle"), label: t("Lifestyle & amenities", "نمط الحياة والمرافق") } },
      ],
    },
    cta: { ...enquiry(l, "enquire", "residential"), body: t(`Ask the DAMA sales team about ${current.type} (${current.area}). Availability, prices and payment plans are shared directly.`, `اسأل فريق مبيعات داما عن ${current.type} (${current.area}). تُشارَك التوفر والأسعار وخطط السداد مباشرة.`) } as Block,
  };
}

export function residentialLocationBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const loc = rawasinMall[l].location;
  const copy = rawasinProject.copy[l];
  const labels = getDictionary(l).projectDetail.location;
  const mapTile: Tile[] = rawasinProject.mapUrl ? [{ t: "text", tone: "red", title: copy.location, href: { url: rawasinProject.mapUrl, label: labels.view } }] : [];
  return {
    where: {
      kind: "bento", id: "where", eyebrow: labels.eyebrow, lines: [copy.location], body: copy.locationNote,
      tiles: [
        { t: "image", image: R.aerialRoundabout, span: "big" },
        ...mapTile,
        { t: "text", title: t("Nearby destinations", "الوجهات القريبة"), points: loc.destinations.slice(0, 3) },
        { t: "image", image: R.masterTop, span: "wide" },
        { t: "text", tone: "sand", span: "wide", title: t("Services nearby", "خدمات في المحيط"), points: loc.destinations.slice(3) },
        ...loc.access.map((a): Tile => ({ t: "text", tone: "dark", title: a.title, body: a.body })),
        {
          t: "text", span: "wide", image: R.aerial2,
          title: [t("Homes, services", "السكن والخدمات"), t("and modern living", "ونمط الحياة العصري")].join(" "),
          body: t("The mall sits within Rawasin, bringing everyday shopping and services closer to home and creating an integrated community.", "يقع المول داخل مشروع رواسين، فيقرّب التسوق والخدمات اليومية من البيت ويصنع مجتمعًا متكاملًا."),
          link: { ...rawasinLink("mall-location"), label: t("Mall location", "موقع المول") },
        },
      ],
      footnote: t("The brochure lists these destinations within easy reach of the southern expansion of New Sohag. It does not publish travel times or distances.", "يذكر الكتيّب هذه الوجهات ضمن نطاق سهل الوصول من التوسعات الجنوبية لسوهاج الجديدة، ولا ينشر أزمنة أو مسافات الوصول."),
    },
    cta: enquiry(l, "enquire", "residential"),
  };
}

/* ------------------------------------------------------------------ */
/* Commercial / Mall                                                    */
/* ------------------------------------------------------------------ */
function levelCards(l: Locale, withLinks = true): { title: string; body: string; tag: string; points: string[]; link?: BlockLink }[] {
  const t = tr(l);
  return [...rawasinMall[l].floors.list].reverse().map((f) => ({
    tag: f.officialLabel,
    title: f.headline,
    body: f.categories.join(" · "),
    points: f.highlights,
    link: withLinks ? { ...rawasinLink("mall-floor", f.id), label: t("Floor details", "تفاصيل الدور") } : undefined,
  }));
}

export function commercialBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const m = rawasinMall[l];
  return {
    intro: {
      kind: "split", id: "commercial-intro", eyebrow: t("Commercial development", "التطوير التجاري"), lines: [t("A destination for", "وجهة لـ"), t("*everyday life*", "*الحياة اليومية*")],
      body: [
        t("Rawasin Mall brings shopping, healthcare, dining and leisure close to home. A single visit can combine buying household needs, time at a café or restaurant, and a medical service.", "يجمع رواسين مول التسوق والرعاية الصحية والطعام والترفيه بالقرب من البيت. يمكن أن تجمع زيارة واحدة بين شراء احتياجات المنزل وقضاء وقت في مقهى أو مطعم أو التوجه إلى إحدى الخدمات الطبية."),
        t("It is located within Rawasin, in the southern expansion of New Sohag.", "ويقع داخل مشروع رواسين، في التوسعات الجنوبية لسوهاج الجديدة."),
      ],
      points: m.hero.points,
      image: M.dayFront,
    },
    banner: { kind: "banner", id: "commercial-banner", image: M.dayFront2, priority: true },
    bento: { kind: "mosaic", id: "commercial-bento", layout: "bento", images: [M.dayTerrace, M.dayMedicalDoor, M.nightFront, M.dayEntrance3, M.nightCorner] },
    figures: {
      kind: "facts", id: "commercial-figures", eyebrow: t("Scale", "الحجم"), lines: [t("The mall", "المول"), t("*in numbers*", "*بالأرقام*")], tone: "light",
      items: [
        { label: t("Commercial land area", "مساحة الأرض التجارية"), value: MALL.land.replace("m²", t("m²", "م²")) },
        { label: t("Frontage", "طول الواجهة"), value: t("123 m", "123 م") },
        { label: t("Levels", "المستويات"), value: "5", note: t("Basement, ground and three upper floors", "بدروم ودور أرضي وثلاثة أدوار علوية") },
        { label: t("Numbered retail shops", "محال تجارية مرقّمة"), value: String(retailAll.n), note: t("On the ground and first floors", "بالدورين الأرضي والأول") },
        { label: t("Clinic units", "وحدات عيادات"), value: String(clinics.n), note: t(`${clinics.min} to ${clinics.max} m², second floor`, `من ${clinics.min} إلى ${clinics.max} م²، بالدور الثاني`) },
        { label: t("Hypermarket", "هايبر ماركت"), value: t("754 m²", "754 م²"), note: t("Basement, with underground parking", "بالبدروم مع مواقف تحت الأرض") },
      ],
    },
    destinations: {
      kind: "cards", id: "destinations", eyebrow: t("Main destinations", "أبرز الوجهات"), lines: [t("Shopping, health,", "تسوق وصحة،"), t("*fitness and leisure*", "*ولياقة وترفيه*")],
      items: [
        { title: t("Everyday shopping", "التسوق اليومي"), body: t("A 754 m² hypermarket in the basement, with underground parking, and retail shops on the ground and first floors.", "هايبر ماركت بمساحة 754 م² بالبدروم مع مواقف تحت الأرض، ومحال تجارية بالدورين الأرضي والأول."), link: { ...rawasinLink("mall-units", undefined), label: t("Commercial units", "الوحدات التجارية") } },
        { title: t("Dining", "الطعام"), body: t("Two restaurants, a café, a juice shop and a dessert shop on the ground floor, and a 367.7 m² food court on the first floor.", "مطعمان وكافيه ومحل عصائر ومحل حلويات بالدور الأرضي، ومنطقة طعام بمساحة 367.7 م² بالدور الأول."), link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") } },
        { title: t("Medical destination", "الوجهة الطبية"), body: t("The second floor hosts 22 clinic units, two medical laboratories and a 638 m² obstetrics and gynaecology department.", "يضم الدور الثاني 22 وحدة عيادات ومعملين طبيين وقسمًا للنساء والتوليد بمساحة 638 م²."), link: { ...rawasinLink("mall-medical"), label: t("Medical destination", "الوجهة الطبية") } },
        { title: t("Fitness and personal care", "اللياقة والعناية"), body: t("The third floor combines an indoor gym, an outdoor gym, a health club and a beauty centre with a café and outdoor café.", "يجمع الدور الثالث جيمًا داخليًا وآخر خارجيًا ونادٍ صحيًا ومركز تجميل مع كافيه ومساحة كافيه خارجية."), link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") } },
        { title: t("Family leisure", "ترفيه العائلة"), body: t("A 220.5 m² children's area on the first floor, beside the food court and retail units.", "منطقة أطفال بمساحة 220.5 م² بالدور الأول بجوار منطقة الطعام والمحال."), link: { ...rawasinLink("mall-floor", "first"), label: t("First floor", "الدور الأول") } },
        { title: t("Services", "الخدمات"), body: t("Pharmacies and a medical reception on the ground floor, supported by professional facilities management.", "صيدليات واستقبال طبي بالدور الأرضي، مدعومة بإدارة مرافق متخصصة."), link: { ...rawasinLink("mall-operations"), label: t("Management & operations", "الإدارة والتشغيل") } },
      ],
    },
    explore: {
      kind: "cards", id: "explore-mall", eyebrow: t("Explore", "استكشف"), lines: [t("Rawasin Mall,", "رواسين مول،"), t("*page by page*", "*صفحة بصفحة*")], tone: "light",
      body: t("The mall has its own pages for its master plan, floors, unit types, medical destination, operations and partners.", "للمول صفحات مستقلة للمخطط العام والأدوار وأنواع الوحدات والوجهة الطبية والتشغيل والشركاء."),
      items: [
        { title: t("Mall overview", "نظرة عامة على المول"), body: t("Concept, specifications and the five levels.", "الفكرة والمواصفات والمستويات الخمسة."), link: { ...rawasinLink("mall"), label: t("Open", "افتح") } },
        { title: t("Master plan", "المخطط العام"), body: t("Zoning, circulation and floor distribution.", "التوزيع الوظيفي والحركة وتوزيع الأدوار."), link: { ...rawasinLink("mall-master-plan"), label: t("Open", "افتح") } },
        { title: t("Floor plans", "مخططات الأدوار"), body: t("Basement to third floor, with unit schedules.", "من البدروم إلى الدور الثالث مع جداول الوحدات."), link: { ...rawasinLink("mall-floors"), label: t("Open", "افتح") } },
        { title: t("Unit types", "أنواع الوحدات"), body: t("Retail and medical unit opportunities.", "فرص الوحدات التجارية والطبية."), link: { ...rawasinLink("mall-units"), label: t("Open", "افتح") } },
        { title: t("Management & operations", "الإدارة والتشغيل"), body: t("How the mall is run, secured and maintained.", "كيف يُدار المول ويُؤمَّن ويُصان."), link: { ...rawasinLink("mall-operations"), label: t("Open", "افتح") } },
        { title: t("Partners", "الشركاء"), body: t("The organisations behind the mall's roles.", "الجهات صاحبة الأدوار في المول."), link: { ...rawasinLink("mall-partners"), label: t("Open", "افتح") } },
      ],
    },
    cta: enquiry(l, "enquire", "commercial"),
  };
}

export function mallOverviewBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const m = rawasinMall[l];
  return {
    concept: {
      kind: "split", id: "concept", eyebrow: t("Concept & purpose", "الفكرة والهدف"), lines: [t("Bringing", "نجمع"), t("*Life Together*", "*جوانب الحياة*")],
      body: [
        t("Rawasin Mall is envisioned as a modern, integrated destination in the heart of New Sohag, bringing commercial activities and medical services together in one place to meet everyday needs.", "يأتي رواسين مول برؤية عصرية لتقديم وجهة متكاملة في قلب سوهاج الجديدة، تجمع بين الأنشطة التجارية والخدمات الطبية في مكان واحد لتلبية احتياجات الحياة اليومية."),
        t("It aims to be more than a shopping centre or a medical destination: an environment where shopping, healthcare, fitness and entertainment come together.", "ويسعى إلى أن يكون أكثر من مركز للتسوق أو وجهة للخدمات الطبية؛ بل مساحة تجمع بين التسوق والصحة واللياقة البدنية والترفيه."),
      ],
      points: [t("Purpose: an integrated destination combining commerce, healthcare and entertainment to meet the community's needs in one place", "الهدف: وجهة متكاملة تجمع بين التجارة والخدمات الطبية والترفيه لتلبية احتياجات المجتمع في مكان واحد"), t("Identity: rooted in Sohag, with a modern commercial outlook", "الهوية: متجذّرة في سوهاج برؤية تجارية عصرية")],
      images: [M.dayTerrace, B.mallEntrance],
    },
    duo: { kind: "mosaic", id: "mall-duo", layout: "duo", images: [M.dayColonnade, M.dayEscalator] },
    specs: {
      kind: "facts", id: "specifications", eyebrow: t("Project specifications", "مواصفات المشروع"), lines: [t("The mall,", "المول،"), t("*specified*", "*بالتفصيل*")], tone: "light",
      body: t("The master plan features an active retail strip, with retail, medical and leisure spaces serving a wide range of visitors and businesses.", "يتميز المخطط العام بشريط تجاري نشط، تخدم فيه المساحات التجارية والطبية والترفيهية شريحة واسعة من الزوار والأنشطة."),
      items: [
        { label: t("Commercial land area", "مساحة الأرض التجارية"), value: MALL.land.replace("m²", t("m²", "م²")) },
        { label: t("Frontage", "طول الواجهة"), value: t("123 metres", "123 مترًا"), note: t("Its position and visibility along key routes support the businesses in the mall.", "يدعم موقعه الظاهر على أهم المحاور نجاح الأنشطة داخل المول.") },
        { label: t("Building configuration", "تكوين المبنى"), value: t("5 levels", "5 مستويات"), note: t("Basement, ground floor and three upper floors", "بدروم ودور أرضي وثلاثة أدوار علوية") },
        { label: t("Location", "الموقع"), value: t("Within Rawasin", "داخل رواسين"), note: t("Southern expansion of New Sohag", "التوسعات الجنوبية لسوهاج الجديدة") },
      ],
    },
    levels: {
      kind: "cards", id: "levels", eyebrow: t("Five levels", "خمسة مستويات"), lines: [t("One building,", "مبنى واحد،"), t("*five levels*", "*وخمسة مستويات*")],
      body: t("The levels are planned for easy circulation, with shopping, healthcare, fitness and personal care spread across them.", "تُخطَّط المستويات لسهولة الحركة، مع توزيع أنشطة التسوق والخدمات الطبية واللياقة والعناية بينها."),
      items: levelCards(l),
    },
    experience: {
      kind: "groups", id: "visitor-experience", eyebrow: t("Visitor experience", "تجربة الزائر"), lines: [t("Easy to reach,", "سهل الوصول،"), t("*easy to navigate*", "*وسهل التنقل*")], tone: "light",
      groups: [
        { title: t("Arriving", "الوصول"), items: [t("Underground parking serving the mall", "مواقف تحت الأرض تخدم المول"), t("Electronic payment and advance parking reservation", "دفع إلكتروني وحجز مسبق للمواقف"), t("Outdoor seating along the frontage for selected units", "جلسات خارجية على واجهة المول لبعض الوحدات")] },
        { title: t("Finding your way", "التوجيه"), items: [t("Digital information screens and illuminated boards", "شاشات معلومات رقمية ولوحات مضيئة"), t("Information desks at the entrances", "مكاتب استعلامات في المداخل"), t("Clear signage between floors", "إشارات توجيهية واضحة بين الأدوار")] },
        { title: t("For everyone", "للجميع"), items: [t("Audio and tactile signage for people with disabilities", "لافتات صوتية ولمسية لدعم ذوي الهمم"), t("Accessible routes in the parking area", "مسارات ميسرة في منطقة الجراج")] },
      ],
      footnote: t("Wayfinding, parking and accessibility features are described in the mall's operations plan. Main entrance locations are not specified in the source documents.", "ميزات التوجيه والمواقف وإتاحة الوصول واردة في خطة تشغيل المول. ولا تحدد المستندات المصدرية مواقع المداخل الرئيسية."),
    },
    management: {
      kind: "split", id: "management", eyebrow: t("Management & operations", "الإدارة والتشغيل"), lines: [t("Operated by", "يديره"), t("*ACCORD*", "*ACCORD*")],
      body: m.partners.entries[1].description,
      points: [t("Maintenance, cleaning and facility care", "الصيانة والنظافة والعناية بالمرافق"), t("Support for visitor circulation and access to services", "دعم حركة الزوار والوصول إلى الخدمات"), t("Readiness of shared areas and operating efficiency", "جاهزية المساحات المشتركة وكفاءة التشغيل")],
      aside: undefined,
      link: { ...rawasinLink("mall-operations"), label: t("Management & operations", "الإدارة والتشغيل") },
      image: M.nightFront,
      reverse: true,
    },
  };
}

export function masterPlanBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const f = rawasinMall[l].floors.list;
  const lbl = (id: FloorId) => f.find((x) => x.id === id)!.label;
  return {
    zoning: {
      kind: "groups", id: "zoning", eyebrow: t("Functional zoning", "التوزيع الوظيفي"), lines: [t("Uses, grouped", "الاستخدامات،"), t("*by function*", "*مجمّعة حسب الوظيفة*")], tone: "light",
      body: t("Each floor plan colour-codes its spaces by function. These are the categories used across the plans.", "يميّز كل مخطط دور مساحاته بألوان حسب الوظيفة. هذه هي الفئات المستخدمة عبر المخططات."),
      groups: [
        { title: t("Retail", "التجاري"), items: [t("Retail shops", "محال تجارية"), t("Hypermarket (basement)", "هايبر ماركت (بالبدروم)")] },
        { title: t("Food & beverage", "المأكولات والمشروبات"), items: [t("Restaurants, café, juice and dessert shops", "مطاعم وكافيه ومحل عصائر ومحل حلويات"), t("Food court", "منطقة طعام"), t("Café and outdoor café (third floor)", "كافيه وكافيه خارجي (بالدور الثالث)")] },
        { title: t("Medical", "الطبي"), items: [t("Clinics and medical reception", "عيادات واستقبال طبي"), t("Medical laboratories", "معامل طبية"), t("Obstetrics and gynaecology department", "قسم النساء والتوليد")] },
        { title: t("Leisure & fitness", "الترفيه واللياقة"), items: [t("Kids area", "منطقة أطفال"), t("Indoor and outdoor gym", "جيم داخلي وخارجي"), t("Health club and beauty centre", "نادٍ صحي ومركز تجميل")] },
      ],
    },
    distribution: {
      kind: "table", id: "floor-distribution", eyebrow: t("Floor distribution", "توزيع الأدوار"), lines: [t("What is", "ما يوجد"), t("*on each floor*", "*في كل دور*")],
      head: [t("Floor", "الدور"), t("Main uses", "الاستخدامات الرئيسية"), t("Key published areas", "أبرز المساحات المنشورة"), t("Details", "التفاصيل")],
      rows: [
        [lbl("third"), t("Fitness, health club, beauty centre, clinic, café", "لياقة ونادٍ صحي ومركز تجميل وعيادة وكافيه"), t("Gym 350.7 m² · Outdoor gym 212.8 m²", "جيم 350.7 م² · جيم خارجي 212.8 م²"), { text: t("Open", "افتح"), link: { ...rawasinLink("mall-floor", "third") } }],
        [lbl("second"), t("22 clinics, 2 laboratories, obstetrics and gynaecology", "22 عيادة ومعملان وقسم نساء وتوليد"), t("O&G 638 m² · Labs 189 and 174.3 m²", "نساء وتوليد 638 م² · معامل 189 و174.3 م²"), { text: t("Open", "افتح"), link: { ...rawasinLink("mall-floor", "second") } }],
        [lbl("first"), t("Retail shops, food court, kids area", "محال تجارية ومنطقة طعام ومنطقة أطفال"), t("Food court 367.7 m² · Kids 220.5 m²", "منطقة طعام 367.7 م² · أطفال 220.5 م²"), { text: t("Open", "افتح"), link: { ...rawasinLink("mall-floor", "first") } }],
        [lbl("ground"), t("Retail, restaurants, cafés, pharmacies, medical reception", "محال ومطاعم ومقاهٍ وصيدليات واستقبال طبي"), t("Restaurants 192.5 and 168.9 m² · Café 191.55 m²", "مطعمان 192.5 و168.9 م² · كافيه 191.55 م²"), { text: t("Open", "افتح"), link: { ...rawasinLink("mall-floor", "ground") } }],
        [lbl("basement"), t("Hypermarket, underground parking", "هايبر ماركت ومواقف تحت الأرض"), t("Hypermarket 754 m²", "هايبر ماركت 754 م²"), { text: t("Open", "افتح"), link: { ...rawasinLink("mall-floor", "basement") } }],
      ],
    },
    circulation: {
      kind: "groups", id: "circulation", eyebrow: t("Circulation & support", "الحركة والخدمات المساندة"), lines: [t("Planned for", "مخطط من أجل"), t("*easy movement*", "*سهولة الحركة*")], tone: "light",
      body: t("The plans mark circulation areas separately from retail, medical and leisure space, and show the support spaces that serve each floor.", "تُظهر المخططات مناطق الحركة منفصلة عن المساحات التجارية والطبية والترفيهية، وتبيّن المساحات المساندة التي تخدم كل دور."),
      groups: [
        { title: t("On the ground to second floors", "من الدور الأرضي إلى الثاني"), items: [t("IT room", "غرفة تقنية المعلومات"), t("Garbage chutes, including a medical chute", "مجاري نفايات، منها مجرى للنفايات الطبية"), t("RMU room and storage room", "غرفة RMU وغرفة تخزين"), t("Men's and women's WCs, cleaning equipment", "دورات مياه للرجال والنساء ومعدات نظافة")] },
        { title: t("On the third floor", "بالدور الثالث"), items: [t("Men's and women's WCs", "دورات مياه للرجال والنساء"), t("Cleaning equipment", "معدات نظافة")] },
        { title: t("Movement between levels", "الحركة بين المستويات"), items: [t("Clear signage guides movement between floors", "إشارات توجيهية واضحة لتسهيل الحركة بين الأدوار"), t("Large, separate medical lifts for patient beds", "مصاعد طبية منفصلة كبيرة للأسرة المتحركة"), t("Emergency exits distributed along evacuation routes", "مخارج طوارئ موزعة على مسارات الإخلاء")] },
      ],
      footnote: t("Main entrance positions and a site-wide circulation diagram are not included in the source documents.", "لا تتضمن المستندات المصدرية مواقع المداخل الرئيسية ولا مخططًا عامًا للحركة داخل الموقع."),
    },
    cta: {
      kind: "cta", id: "explore-plans", eyebrow: t("Floor plans", "مخططات الأدوار"), lines: [t("See each level", "اطّلع على كل مستوى"), t("*in detail*", "*بالتفصيل*")],
      body: t("Every floor has its own page with the original plan and unit schedule.", "لكل دور صفحة مستقلة بالمخطط الأصلي وجدول الوحدات."),
      primary: { label: t("Floor plans", "مخططات الأدوار"), link: { ...rawasinLink("mall-floors") } },
      secondary: { label: t("Unit types", "أنواع الوحدات"), link: { ...rawasinLink("mall-units") } },
    },
  };
}

export function floorsIndexBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const f = rawasinMall[l].floors.list;
  const rowFor = (id: FloorId): Cell[] => {
    const fl = f.find((x) => x.id === id)!;
    return [{ text: fl.label, link: { ...rawasinLink("mall-floor", id) } }, fl.categories.join(" · "), fl.highlights.slice(0, 2).join(" · ")];
  };
  return {
    overview: {
      kind: "table", id: "levels-overview", eyebrow: t("Overview", "نظرة عامة"), lines: [t("The five levels,", "المستويات الخمسة،"), t("*compared*", "*مقارنة*")], tone: "light",
      head: [t("Floor", "الدور"), t("Activities", "الأنشطة"), t("Highlights", "أبرز ما فيه")],
      rows: (["third", "second", "first", "ground", "basement"] as FloorId[]).map(rowFor),
    },
    reading: {
      kind: "groups", id: "reading-plans", eyebrow: t("Reading the plans", "قراءة المخططات"), lines: [t("What the plans", "ما تعرضه"), t("*show*", "*المخططات*")],
      body: t("Each plan colour-codes its spaces and lists unit numbers with areas in square metres, exactly as published.", "يميّز كل مخطط المساحات بالألوان ويسرد أرقام الوحدات ومساحاتها بالمتر المربع كما نُشرت تمامًا."),
      groups: [
        { title: t("Categories", "الفئات"), items: [t("F&B", "مأكولات ومشروبات"), t("Retail", "تجاري"), t("Clinics, laboratories and obstetrics & gynaecology", "عيادات ومعامل ونساء وتوليد"), t("Kids area, gym and outdoor spaces", "منطقة أطفال وجيم ومساحات خارجية"), t("Circulation", "حركة")] },
        { title: t("Published schedules", "الجداول المنشورة"), items: [t(`${retailAll.n} numbered retail shops`, `${retailAll.n} محلًا تجاريًا مرقّمًا`), t(`${clinics.n} clinic units`, `${clinics.n} وحدة عيادة`), t("Laboratories, department, restaurants, cafés and pharmacies by name", "المعامل والقسم والمطاعم والمقاهي والصيدليات بالاسم")] },
      ],
      footnote: t("Floors are listed top to bottom.", "تُعرض الأدوار من الأعلى إلى الأسفل."),
    },
    cta: {
      kind: "cta", id: "plans-next", eyebrow: t("Next", "التالي"), lines: [t("From plans to", "من المخططات إلى"), t("*opportunities*", "*الفرص*")],
      body: t("Explore the retail and medical unit types, or see how the zones fit together in the master plan.", "استكشف أنواع الوحدات التجارية والطبية، أو اطّلع على ترابط المناطق في المخطط العام."),
      primary: { label: t("Unit types", "أنواع الوحدات"), link: { ...rawasinLink("mall-units") } },
      secondary: { label: t("Master plan", "المخطط العام"), link: { ...rawasinLink("mall-master-plan") } },
    },
  };
}

type FloorExtra = { focus: Block; standards?: Block };

export function floorDetailBlocks(l: Locale, id: FloorId): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const f = rawasinMall[l].floors.list;
  const order: FloorId[] = ["basement", "ground", "first", "second", "third"];
  const i = order.indexOf(id);
  const prev = order[i - 1];
  const next = order[i + 1];
  const lbl = (x: FloorId) => f.find((y) => y.id === x)!.label;
  const extras: Record<FloorId, FloorExtra> = {
    basement: {
      focus: {
        kind: "split", id: "focus", eyebrow: t("This level", "هذا المستوى"), lines: [t("Everyday shopping,", "تسوق يومي،"), t("*easy parking*", "*ومواقف سهلة*")],
        body: t("A 754 m² hypermarket provides dedicated space for everyday shopping and household essentials. Underground parking gives convenient access to the mall.", "يضم البدروم هايبر ماركت بمساحة 754 م² يوفر مساحة مخصصة للتسوق اليومي واحتياجات المنزل، كما يشمل مواقف سيارات تحت الأرض لسهولة الوصول إلى المول."),
        points: [t("Hypermarket: 754 m²", "هايبر ماركت: 754 م²"), t("Underground parking", "مواقف تحت الأرض")],
        image: M.dayCorner,
      },
      standards: {
        kind: "groups", id: "standards", eyebrow: t("Parking standards", "معايير الجراج"), lines: [t("Parking, planned for", "جراج مخطط من أجل"), t("*safety and flow*", "*الأمان وسلاسة الحركة*")], tone: "light",
        groups: [
          { title: t("Access and safety", "الوصول والأمان"), items: [t("Accessible routes for cars, maintenance teams and people with disabilities", "مسارات ميسرة لحركة السيارات وفرق الصيانة وذوي الهمم"), t("Strict entrance security and advanced fire-fighting systems", "تأمين صارم للمداخل وأنظمة متطورة لمكافحة الحرائق"), t("Lighting designed for visibility and safety (400 lux)", "إضاءة مصممة للرؤية والسلامة (400 لوكس)")] },
          { title: t("Floors and ramps", "الأرضيات والمنحدرات"), items: [t("Epoxy-reinforced concrete floors, treated against slipping on ramps", "أرضيات خرسانة مسلحة بإيبوكسي، ومعالجة لمنع الانزلاق على المنحدرات"), t("Ramps with a maximum gradient of 15% and side guard rails", "منحدرات بميل أقصى 15% مع حواجز أمان جانبية"), t("Dedicated, orderly storage areas", "مساحات تخزين مخصصة ومرتبة")] },
          { title: t("Smart management", "الإدارة الذكية"), items: [t("Smart traffic and gate management", "أنظمة ذكية لإدارة المرور والبوابات"), t("Electronic payment and advance parking reservation", "الدفع الإلكتروني والحجز المسبق للمواقف"), t("Ground signage organising vehicle and pedestrian movement", "إشارات أرضية لتنظيم حركة السيارات والمشاة")] },
        ],
      },
    },
    ground: {
      focus: {
        kind: "split", id: "focus", eyebrow: t("This level", "هذا المستوى"), lines: [t("The mall's", "واجهة المول"), t("*welcome level*", "*المستقبِلة*")],
        body: t("The ground floor brings together retail shops, restaurants, cafés, pharmacies and a medical reception. Selected units open onto outdoor seating along the mall frontage, connecting indoor spaces with the outdoor experience.", "يجمع الدور الأرضي المحال والمطاعم والمقاهي والصيدليات والاستقبال الطبي. وتتصل بعض الوحدات بمساحات جلوس خارجية على واجهة المول، لتتكامل المساحات الداخلية مع التجربة الخارجية."),
        points: [t(`${retailGround.n} numbered retail shops, ${retailGround.min} to ${retailGround.max} m²`, `${retailGround.n} محلًا تجاريًا مرقّمًا من ${retailGround.min} إلى ${retailGround.max} م²`), t("Restaurants of 192.5 and 168.9 m², café of 191.55 m²", "مطعمان بمساحة 192.5 و168.9 م²، وكافيه 191.55 م²"), t("Juice shop, dessert shop and two pharmacies", "محل عصائر ومحل حلويات وصيدليتان")],
        image: M.dayTerrace,
        link: { ...rawasinLink("mall-units"), label: t("Retail unit types", "أنواع الوحدات التجارية") },
      },
      standards: {
        kind: "groups", id: "standards", eyebrow: t("Operating standards", "معايير التشغيل"), lines: [t("Lit and kept for", "إضاءة وتشغيل من أجل"), t("*retail*", "*التجارة*")], tone: "light",
        groups: [
          { title: t("Lighting", "الإضاءة"), items: [t("500 lux on commercial floors: strong light that shows products without distracting reflections", "500 لوكس في الأدوار التجارية: إضاءة قوية لإبراز المنتجات دون انعكاسات مزعجة"), t("Motion sensors to save energy; emergency lighting for corridors and exits", "حساسات حركة لترشيد الطاقة، وإضاءة طوارئ للممرات والمخارج")] },
          { title: t("Support spaces", "المساحات المساندة"), items: [t("IT room, garbage chutes, RMU room and storage room", "غرفة تقنية المعلومات ومجاري النفايات وغرفة RMU وغرفة تخزين"), t("Men's and women's WCs; cleaning equipment", "دورات مياه للرجال والنساء ومعدات نظافة")] },
        ],
      },
    },
    first: {
      focus: {
        kind: "split", id: "focus", eyebrow: t("This level", "هذا المستوى"), lines: [t("More reasons", "أسباب أكثر"), t("*to visit*", "*للزيارة*")],
        body: t("Retail units in various sizes sit alongside a 367.7 m² food court and a 220.5 m² children's area. Shopping, dining and leisure come together for individuals and families.", "تجتمع وحدات تجارية بمساحات متنوعة مع منطقة طعام بمساحة 367.7 م² ومنطقة أطفال بمساحة 220.5 م²، ليجمع هذا التوزيع بين التسوق والطعام والترفيه للأفراد والعائلات."),
        points: [t(`${retailFirst.n} numbered retail shops, ${retailFirst.min} to ${retailFirst.max} m²`, `${retailFirst.n} محلًا تجاريًا مرقّمًا من ${retailFirst.min} إلى ${retailFirst.max} م²`), t("Food court: 367.7 m²", "منطقة الطعام: 367.7 م²"), t("Kids area: 220.5 m²", "منطقة الأطفال: 220.5 م²")],
        image: M.dayEntrance3,
        link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") },
      },
    },
    second: {
      focus: {
        kind: "facts", id: "focus", eyebrow: t("This level", "هذا المستوى"), lines: [t("Medical specialties,", "تخصصات طبية،"), t("*one floor*", "*في دور واحد*")],
        body: t("This layout brings clinics and complementary medical services together on one floor.", "يجمع هذا التوزيع العيادات والخدمات الطبية المكملة في دور واحد."),
        items: [
          { label: t("Clinic units", "وحدات العيادات"), value: "22", note: t("18.32 to 45.4 m²", "من 18.32 إلى 45.4 م²") },
          { label: t("Medical laboratories", "معامل طبية"), value: t("189 · 174.3 m²", "189 · 174.3 م²") },
          { label: t("Obstetrics & gynaecology", "نساء وتوليد"), value: t("638 m²", "638 م²") },
        ],
      },
      standards: {
        kind: "groups", id: "standards", eyebrow: t("Medical standards", "المعايير الطبية"), lines: [t("Operated to", "تشغيل وفق"), t("*medical standards*", "*معايير طبية*")], tone: "light",
        body: t("Operating standards set for the medical sector at Rawasin.", "المعايير التشغيلية المقررة للقطاع الطبي في رواسين."),
        groups: [
          { title: t("Healthy and safe", "بيئة صحية وآمنة"), items: [t("A separate system for medical waste, in line with health standards", "نظام منفصل للتخلص من النفايات الطبية وفقًا للمعايير الصحية"), t("Approved sterilisation and disinfection procedures", "إجراءات تعقيم وتطهير معتمدة")] },
          { title: t("Movement and privacy", "الحركة والخصوصية"), items: [t("Corridors of at least 1.8 m for patient beds", "ممرات لا تقل عن 1.8 م لحركة الأسرة المتحركة"), t("Separate, large medical lifts, so patient routes do not mix with other visitors", "مصاعد طبية منفصلة كبيرة لعدم تداخل مسارات المرضى مع باقي الزوار")] },
          { title: t("Efficiency", "الكفاءة"), items: [t("A unified reception desk serving all clinics", "مكتب استقبال موحد يخدم جميع العيادات"), t("Easy-to-clean, low-maintenance finishes", "مواد تشطيب سهلة التنظيف والتعقيم وقليلة الصيانة"), t("An application linked to display screens for appointments and navigation", "تطبيق مرتبط بشاشات عرض لمتابعة المواعيد والتنقل")] },
        ],
      },
    },
    third: {
      focus: {
        kind: "split", id: "focus", eyebrow: t("This level", "هذا المستوى"), lines: [t("More for", "المزيد"), t("*your day*", "*ليومك*")],
        body: t("The third floor includes indoor and outdoor gyms, a health club, a beauty centre, a café with outdoor space and a clinic unit. A variety of activities creates space for fitness, personal care and leisure.", "يجمع الدور الثالث الجيم والجيم الخارجي والنادي الصحي ومركز التجميل، إلى جانب كافيه ومساحة كافيه خارجية ووحدة عيادة. ويتيح هذا التنوع مساحات للياقة والعناية والترفيه."),
        points: [t("Indoor gym 350.7 m² and outdoor gym 212.8 m²", "جيم 350.7 م² وجيم خارجي 212.8 م²"), t("Health club 186.7 m² and beauty centre 71.9 m²", "نادٍ صحي 186.7 م² ومركز تجميل 71.9 م²"), t("Café 154 m², outdoor café 148 m² and a 38 m² clinic", "كافيه 154 م² وكافيه خارجي 148 م² وعيادة 38 م²")],
        image: M.nightCorner,
        link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") },
      },
    },
  };
  const e = extras[id];
  const related: Record<FloorId, { title: string; body: string; link: BlockLink }> = {
    basement: { title: t("Parking operations", "تشغيل الجراج"), body: t("Access, safety, lighting and smart management of the basement parking.", "الوصول والأمان والإضاءة والإدارة الذكية لجراج البدروم."), link: { ...rawasinLink("mall-operations"), label: t("Management & operations", "الإدارة والتشغيل") } },
    ground: { title: t("Retail unit types", "أنواع الوحدات التجارية"), body: t("Shops, dining and pharmacy units, with areas.", "المحال ووحدات الطعام والصيدليات بمساحاتها."), link: { ...rawasinLink("mall-units"), label: t("Unit types", "أنواع الوحدات") } },
    first: { title: t("Lifestyle & leisure", "نمط الحياة والترفيه"), body: t("Dining, the food court and family leisure.", "الطعام ومنطقة الطعام وترفيه العائلة."), link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") } },
    second: { title: t("Medical destination", "الوجهة الطبية"), body: t("The medical concept, departments and operating standards.", "الفكرة الطبية والأقسام والمعايير التشغيلية."), link: { ...rawasinLink("mall-medical"), label: t("Medical destination", "الوجهة الطبية") } },
    third: { title: t("Lifestyle & leisure", "نمط الحياة والترفيه"), body: t("Fitness, health club, beauty centre and cafés.", "اللياقة والنادي الصحي ومركز التجميل والمقاهي."), link: { ...rawasinLink("mall-lifestyle"), label: t("Lifestyle & leisure", "نمط الحياة والترفيه") } },
  };
  const nav: Block = {
    kind: "cards", id: "neighbours", eyebrow: t("Keep exploring", "واصل الاستكشاف"), lines: [t("Move through", "تنقّل بين"), t("*the mall*", "*أدوار المول*")],
    tone: "white",
    items: [
      ...(next ? [{ title: lbl(next), body: f.find((y) => y.id === next)!.headline, tag: t("Up", "أعلى"), link: { ...rawasinLink("mall-floor", next), label: lbl(next) } }] : []),
      ...(prev ? [{ title: lbl(prev), body: f.find((y) => y.id === prev)!.headline, tag: t("Down", "أسفل"), link: { ...rawasinLink("mall-floor", prev), label: lbl(prev) } }] : []),
      related[id],
    ],
  };
  return { focus: e.focus, ...(e.standards ? { standards: e.standards } : {}), neighbours: nav, cta: enquiry(l, "enquire", "commercial") };
}

export function unitsBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const m = rawasinMall[l];
  const lbl = (id: FloorId) => m.floors.list.find((x) => x.id === id)!.label;
  return {
    business: {
      kind: "split", id: "business", eyebrow: t("For commercial customers", "للأنشطة التجارية"), lines: [t("Spaces built around", "مساحات مصممة حول"), t("*your business*", "*نشاطك*")],
      body: m.about.businessBody,
      aside: [
        { label: t("Numbered retail shops", "محال تجارية مرقّمة"), value: String(retailAll.n) },
        { label: t("Retail area range", "نطاق مساحات المحال"), value: `${retailAll.min} – ${retailAll.max} ${t("m²", "م²")}` },
        { label: t("Clinic units", "وحدات العيادات"), value: String(clinics.n) },
        { label: t("Clinic area range", "نطاق مساحات العيادات"), value: `${clinics.min} – ${clinics.max} ${t("m²", "م²")}` },
      ],
    },
    duo: { kind: "mosaic", id: "units-duo", layout: "duo", images: [M.dayEntrance3, M.dayMedicalDoor] },
    byFloor: {
      kind: "table", id: "units-by-floor", eyebrow: t("Where units are", "أماكن الوحدات"), lines: [t("Units,", "الوحدات،"), t("*floor by floor*", "*دورًا بدور*")], tone: "light",
      head: [t("Floor", "الدور"), t("Unit category", "فئة الوحدات"), t("Published units and areas", "الوحدات والمساحات المنشورة"), t("Details", "التفاصيل")],
      rows: [
        [lbl("ground"), t("Retail shops", "محال تجارية"), t(`${retailGround.n} shops, ${retailGround.min} to ${retailGround.max} m²`, `${retailGround.n} محلًا من ${retailGround.min} إلى ${retailGround.max} م²`), { text: t("Ground floor", "الدور الأرضي"), link: { ...rawasinLink("mall-floor", "ground") } }],
        [lbl("ground"), t("Restaurants, café, juice and dessert shops", "مطاعم وكافيه وعصائر وحلويات"), t("192.5, 168.9, 191.55, 81.84 and 150.3 m²", "192.5 و168.9 و191.55 و81.84 و150.3 م²"), { text: t("Ground floor", "الدور الأرضي"), link: { ...rawasinLink("mall-floor", "ground") } }],
        [lbl("ground"), t("Pharmacies", "صيدليات"), t("77.5 and 133.9 m²", "77.5 و133.9 م²"), { text: t("Ground floor", "الدور الأرضي"), link: { ...rawasinLink("mall-floor", "ground") } }],
        [lbl("first"), t("Retail shops", "محال تجارية"), t(`${retailFirst.n} shops, ${retailFirst.min} to ${retailFirst.max} m²`, `${retailFirst.n} محلًا من ${retailFirst.min} إلى ${retailFirst.max} م²`), { text: t("First floor", "الدور الأول"), link: { ...rawasinLink("mall-floor", "first") } }],
        [lbl("second"), t("Clinics", "عيادات"), t(`${clinics.n} units, ${clinics.min} to ${clinics.max} m²`, `${clinics.n} وحدة من ${clinics.min} إلى ${clinics.max} م²`), { text: t("Second floor", "الدور الثاني"), link: { ...rawasinLink("mall-floor", "second") } }],
        [lbl("third"), t("Gym, health club, beauty centre, clinic", "جيم ونادٍ صحي ومركز تجميل وعيادة"), t("350.7, 186.7, 71.9 and 38 m²", "350.7 و186.7 و71.9 و38 م²"), { text: t("Third floor", "الدور الثالث"), link: { ...rawasinLink("mall-floor", "third") } }],
      ],
      footnote: m.unitTypes.disclaimer,
    },
    cta: enquiry(l, "enquire", "retail"),
  };
}

export function unitDetailBlocks(l: Locale, unit: "retail" | "medical"): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const u = unitsBlocks(l);
  if (unit === "retail") {
    return {
      banner: { kind: "banner", id: "retail-banner", image: M.dayColonnade },
      figures: {
        kind: "facts", id: "retail-figures", eyebrow: t("Retail at a glance", "التجاري بنظرة سريعة"), lines: [t("Retail units,", "الوحدات التجارية،"), t("*in numbers*", "*بالأرقام*")], tone: "light",
        items: [
          { label: t("Numbered retail shops", "محال تجارية مرقّمة"), value: String(retailAll.n), note: t(`${retailGround.n} ground floor, ${retailFirst.n} first floor`, `${retailGround.n} بالدور الأرضي، ${retailFirst.n} بالأول`) },
          { label: t("Smallest published shop", "أصغر محل منشور"), value: `${retailAll.min} ${t("m²", "م²")}` },
          { label: t("Largest published shop", "أكبر محل منشور"), value: `${retailAll.max} ${t("m²", "م²")}` },
          { label: t("Dining units", "وحدات الطعام"), value: "5", note: t("Two restaurants, a café, a juice shop and a dessert shop", "مطعمان وكافيه ومحل عصائر ومحل حلويات") },
        ],
      },
      byFloor: u.byFloor,
      cta: enquiry(l, "enquire", "retail"),
    };
  }
  return {
    banner: { kind: "banner", id: "medical-banner", image: M.dayEscalator },
    figures: {
      kind: "facts", id: "medical-figures", eyebrow: t("Medical at a glance", "الطبي بنظرة سريعة"), lines: [t("Medical units,", "الوحدات الطبية،"), t("*in numbers*", "*بالأرقام*")], tone: "light",
      items: [
        { label: t("Clinic units", "وحدات العيادات"), value: String(clinics.n), note: t(`${clinics.min} to ${clinics.max} m²`, `من ${clinics.min} إلى ${clinics.max} م²`) },
        { label: t("Medical laboratories", "معامل طبية"), value: "2", note: t("189 m² and 174.3 m²", "189 م² و174.3 م²") },
        { label: t("Obstetrics & gynaecology", "نساء وتوليد"), value: t("638 m²", "638 م²"), note: t("A dedicated department", "قسم متخصص") },
        { label: t("Third floor clinic", "عيادة بالدور الثالث"), value: t("38 m²", "38 م²") },
      ],
    },
    byFloor: u.byFloor,
    cta: enquiry(l, "enquire", "medical"),
  };
}

export function medicalBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const second = floorDetailBlocks(l, "second");
  return {
    concept: {
      kind: "split", id: "medical-concept", eyebrow: t("Medical destination", "الوجهة الطبية"), lines: [t("Healthcare within a", "رعاية صحية داخل"), t("*lively destination*", "*وجهة نابضة بالحياة*")],
      body: [
        t("Rawasin Mall offers dedicated medical units suited to clinics and a range of healthcare services, supporting quality care within an integrated commercial setting.", "يوفر مول رواسين وحدات طبية مخصصة تناسب العيادات ومجموعة من خدمات الرعاية الصحية، لدعم رعاية صحية عالية الجودة داخل بيئة تجارية متكاملة."),
        t("The second floor brings specialties together and supports efficient healthcare services within one destination.", "يجمع الدور الثاني التخصصات ويدعم تشغيل الخدمات الصحية بكفاءة داخل وجهة واحدة."),
      ],
      points: [t("Clinics in various sizes", "عيادات بمساحات متنوعة"), t("Medical laboratories", "معامل طبية"), t("A reception and waiting area", "منطقة استقبال وانتظار"), t("A dedicated obstetrics and gynaecology department", "قسم متخصص للنساء والتوليد")],
      image: M.dayMedicalDoor,
    },
    banner: { kind: "banner", id: "medical-banner", image: M.dayMedical },
    departments: {
      ...second.focus,
      id: "medical-areas",
      body: undefined,
      lines: [t("Medical areas,", "المساحات الطبية،"), t("*as published*", "*كما نُشرت*")],
      tone: "light",
    } as Block,
    standards: { ...second.standards!, tone: "white" } as Block,
    cta: enquiry(l, "enquire", "medical"),
  };
}

export function mallLifestyleBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  return {
    dining: {
      kind: "cards", id: "dining", eyebrow: t("Food & beverage", "المأكولات والمشروبات"), lines: [t("Restaurants,", "مطاعم،"), t("*cafés and a food court*", "*ومقاهٍ ومنطقة طعام*")],
      body: t("Dining is spread across three levels, with selected ground-floor units opening onto outdoor seating along the mall frontage.", "يتوزع الطعام على ثلاثة مستويات، مع اتصال بعض وحدات الدور الأرضي بجلسات خارجية على واجهة المول."),
      items: [
        { title: t("Restaurants and café", "المطاعم والكافيه"), tag: t("Ground floor", "الدور الأرضي"), body: t("Restaurant 1 (192.5 m²), Restaurant 2 (168.9 m²) and a café (191.55 m²).", "مطعم 1 (192.5 م²) ومطعم 2 (168.9 م²) وكافيه (191.55 م²)."), points: [t("A juice shop (81.84 m²) and a dessert shop (150.3 m²)", "محل عصائر (81.84 م²) ومحل حلويات (150.3 م²)")], link: { ...rawasinLink("mall-floor", "ground"), label: t("Ground floor", "الدور الأرضي") } },
        { title: t("Food court", "منطقة الطعام"), tag: t("First floor", "الدور الأول"), body: t("A 367.7 m² food court beside the retail units and the children's area.", "منطقة طعام بمساحة 367.7 م² بجوار الوحدات التجارية ومنطقة الأطفال."), link: { ...rawasinLink("mall-floor", "first"), label: t("First floor", "الدور الأول") } },
        { title: t("Café with outdoor space", "كافيه بمساحة خارجية"), tag: t("Third floor", "الدور الثالث"), body: t("A 154 m² café and a 148 m² outdoor café.", "كافيه بمساحة 154 م² ومساحة كافيه خارجية 148 م²."), link: { ...rawasinLink("mall-floor", "third"), label: t("Third floor", "الدور الثالث") } },
      ],
    },
    bento: { kind: "mosaic", id: "lifestyle-bento", layout: "bento", images: [M.dayTerrace, M.dayTerrace2, M.nightEntrance3, M.dayEntrance3, M.nightCorner] },
    rail: { kind: "rail", id: "gallery", images: mallAll(l) },
    family: {
      kind: "split", id: "family", eyebrow: t("Family leisure", "ترفيه العائلة"), lines: [t("Shopping, dining", "تسوق وطعام"), t("*and play*", "*ولعب*")], tone: "light",
      body: t("A 220.5 m² children's area sits on the first floor beside the food court and retail units, so shopping, dining and leisure come together for individuals and families.", "تقع منطقة الأطفال بمساحة 220.5 م² بالدور الأول بجوار منطقة الطعام والوحدات التجارية، لتجتمع أنشطة التسوق والطعام والترفيه للأفراد والعائلات."),
      aside: [
        { label: t("Kids area", "منطقة الأطفال"), value: t("220.5 m²", "220.5 م²") },
        { label: t("Food court", "منطقة الطعام"), value: t("367.7 m²", "367.7 م²") },
      ],
      link: { ...rawasinLink("mall-floor", "first"), label: t("First floor details", "تفاصيل الدور الأول") },
    },
    fitness: {
      kind: "cards", id: "fitness", eyebrow: t("Fitness & personal care", "اللياقة والعناية"), lines: [t("Move, relax", "تحرك واسترخِ"), t("*and recharge*", "*وجدّد طاقتك*")],
      body: t("The third floor adds indoor and outdoor fitness, a health club and a beauty centre.", "يضيف الدور الثالث لياقة داخلية وخارجية ونادٍ صحيًا ومركز تجميل."),
      items: [
        { title: t("Indoor gym", "الجيم الداخلي"), body: t("350.7 m² of indoor fitness space.", "350.7 م² من مساحة اللياقة الداخلية.") },
        { title: t("Outdoor gym", "الجيم الخارجي"), body: t("212.8 m² for exercising in the open air.", "212.8 م² لممارسة الرياضة في الهواء الطلق.") },
        { title: t("Health club", "النادي الصحي"), body: t("186.7 m² health club.", "نادٍ صحي بمساحة 186.7 م².") },
        { title: t("Beauty centre", "مركز التجميل"), body: t("A 71.9 m² beauty centre.", "مركز تجميل بمساحة 71.9 م².") },
      ],
      cols: 3,
      tone: "white",
    },
    cta: {
      kind: "cta", id: "lifestyle-cta", eyebrow: t("Plan your visit", "خطط لزيارتك"), lines: [t("See every", "اطّلع على كل"), t("*floor in detail*", "*دور بالتفصيل*")],
      body: t("Floor pages list every published unit and area.", "تسرد صفحات الأدوار كل وحدة ومساحة منشورة."),
      primary: { label: t("Floor plans", "مخططات الأدوار"), link: { ...rawasinLink("mall-floors") } },
      secondary: { label: t("Contact", "تواصل معنا"), link: { key: "contact" } },
    },
  };
}

function parkingGroups(l: Locale) {
  const std = floorDetailBlocks(l, "basement").standards;
  return std && std.kind === "groups" ? std.groups : [];
}

export function operationsBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  return {
    banner: { kind: "banner", id: "operations-banner", image: M.nightEntrance1 },
    scope: {
      kind: "groups", id: "fm-scope", eyebrow: t("Scope of services", "نطاق الخدمات"), lines: [t("What facility", "ما تشمله"), t("*management covers*", "*إدارة المرافق*")], tone: "light",
      body: t("The strategic aim is to run the mall effectively, safely and sustainably.", "الهدف الاستراتيجي هو ضمان تشغيل المول بشكل فعال وآمن ومستدام."),
      groups: [
        { title: t("Comprehensive maintenance", "الصيانة الشاملة"), items: [t("Mechanical works", "الأعمال الميكانيكية"), t("Electrical works", "الأعمال الكهربائية"), t("Civil works", "الأعمال المدنية"), t("Architectural works", "الأعمال المعمارية")] },
        { title: t("Logistics services", "الخدمات اللوجستية"), items: [t("Hospitality services", "خدمات الضيافة"), t("Cleaning", "النظافة"), t("Parking management", "إدارة المواقف")] },
        { title: t("Smart systems", "الأنظمة الذكية"), items: [t("Operation and maintenance of building management systems (BMS, CMMS)", "تشغيل وصيانة أنظمة إدارة المباني (BMS, CMMS)")] },
      ],
      footnote: t("Why operational facility management (FMO)? Better visitor satisfaction and faster response to faults or requests, proactive risk assessment, and long-term preservation of the mall's value.", "لماذا إدارة المرافق التشغيلية (FMO)؟ لتحسين رضا الزوار وتقليل أوقات الاستجابة للأعطال أو المتطلبات، وتقييم المخاطر استباقيًا والحفاظ على قيمة المول على المدى الطويل."),
    },
    safety: {
      kind: "groups", id: "safety", eyebrow: t("Safety & security", "الأمان والحماية"), lines: [t("Watched, guided", "مراقبة وتوجيه"), t("*and prepared*", "*واستعداد*")],
      groups: [
        { title: t("Surveillance", "المراقبة"), items: [t("Deterrent against theft and vandalism, and legal evidence when needed", "رادع للسرقة والتخريب وتوفير أدلة قانونية عند الحاجة"), t("Round-the-clock monitoring of unusual behaviour, entrances, exits and parking", "رصد السلوكيات غير الاعتيادية وتأمين المداخل والمخارج والمواقف على مدار الساعة"), t("Digital monitoring reduces reliance on manned security", "تقليل الاعتماد على الأمن البشري عبر المراقبة الرقمية")] },
        { title: t("Wayfinding", "التوجيه"), items: [t("Digital information screens and illuminated boards", "شاشات معلومات رقمية ولوحات مضيئة"), t("Information desks at the entrances to avoid crowding", "مكاتب استعلامات في المداخل لتجنب الزحام"), t("Audio and tactile signage for people with disabilities", "لافتات صوتية ولمسية لذوي الهمم")] },
        { title: t("Emergency plans", "خطط الطوارئ"), items: [t("Clear, well-studied evacuation plans", "خطط إخلاء واضحة ومدروسة"), t("Emergency exits distributed across the building", "مخارج طوارئ موزعة بوضوح"), t("Compliance with civil defence requirements", "مطابقة اشتراطات الدفاع المدني")] },
      ],
      tone: "light",
    },
    parking: {
      kind: "groups", id: "parking", eyebrow: t("Parking operations", "تشغيل الجراج"), lines: [t("Parking that", "جراج"), t("*works smoothly*", "*يعمل بسلاسة*")],
      body: t("The basement parking is planned for access, safety and orderly flow.", "يُخطَّط جراج البدروم لسهولة الوصول والأمان وانسيابية الحركة."),
      groups: parkingGroups(l),
    },
    lighting: {
      kind: "facts", id: "lighting", eyebrow: t("Lighting standards", "معايير الإضاءة"), lines: [t("Lit for the", "إضاءة مناسبة"), t("*activity*", "*للنشاط*")], tone: "light",
      body: t("Lighting is distributed according to activity, with motion sensors to save energy and emergency lighting that switches on at once when power fails.", "توزع الإضاءة حسب النشاط، مع حساسات حركة لترشيد الطاقة وإضاءة طوارئ للممرات والمخارج تعمل فور انقطاع الكهرباء."),
      items: [
        { label: t("Commercial floors", "الأدوار التجارية"), value: "500 lux", note: t("Strong light to show products without distracting reflections", "إضاءة قوية لتسليط الضوء على المنتجات دون انعكاسات مزعجة") },
        { label: t("Parking and storage", "الجراجات والمخازن"), value: "400 lux", note: t("Overlapping distribution that prevents shadows and dark areas", "توزيع متداخل يمنع الظلال والمناطق المظلمة") },
        { label: t("Medical floors", "الأدوار الطبية"), value: "250 lux", note: t("Balanced distribution that reduces glare for medical tasks", "توزيع متوازن يقلل التوهج ويناسب المهام الطبية") },
      ],
    },
    maintenance: {
      kind: "cards", id: "maintenance", eyebrow: t("Maintenance & façades", "الصيانة والواجهات"), lines: [t("Care that keeps", "عناية تُبقي"), t("*the mall open*", "*المول مفتوحًا*")], cols: 2,
      items: [
        { title: t("Periodic maintenance", "الصيانة الدورية"), body: t("Early detection of faults protects investment, lowers energy use and operating bills, and addresses electrical or mechanical risks. Works are scheduled for low-occupancy times so visitors are not disturbed.", "الاكتشاف المبكر للأعطال يحمي الاستثمار ويقلل استهلاك الطاقة وفواتير التشغيل ويعالج المخاطر الكهربائية والميكانيكية. وتُجدول الأعمال في أوقات انخفاض الإشغال لعدم تعطيل حركة الزوار.") },
        {
          title: t("Façade cleaning and upkeep", "نظافة وصيانة الواجهات"),
          body: t("An articulated aerial platform moves vertically and horizontally around architectural projections and is operated from ground level, so no permanent equipment is needed on façades or roofs.", "ذراع هيدروليكي مفصلي يتحرك رأسيًا وأفقيًا لتجاوز البروزات المعمارية ويُشغَّل من مستوى الأرض، فلا حاجة لمعدات دائمة على الواجهات أو الأسطح."),
          points: [t("Load capacity of up to 250 kg, with stabilisation and remote control", "قدرة تحميل تصل إلى 250 كجم مع نظام تثبيت وتحكم عن بُعد"), t("Needs safe positioning routes around the building and floors that can bear the load", "يتطلب مسارات تمركز آمنة حول المبنى وأرضيات تتحمل الأحمال")],
        },
      ],
    },
    waste: {
      kind: "groups", id: "waste", eyebrow: t("Waste management", "إدارة النفايات"), lines: [t("Clean, safe,", "نظافة وأمان،"), t("*and sorted*", "*وفرز*")], tone: "light",
      body: t("An integrated system collects, transports and treats waste so the mall stays clean and attractive, protects public health and follows recycling and treatment standards.", "نظام متكامل لجمع ونقل ومعالجة النفايات يحافظ على نظافة المول ومظهره، ويحمي الصحة العامة، ويطبق معايير إعادة التدوير والمعالجة."),
      groups: [
        { title: t("Three waste streams", "ثلاثة مسارات للنفايات"), items: [t("Dry waste from shops: paper, cardboard, plastic and metal packaging", "نفايات جافة من المحلات: ورق وكرتون ومواد تغليف"), t("Organic waste from restaurants and cafés", "نفايات عضوية من المطاعم والكافيهات"), t("Medical waste from clinics: infectious, sharps, chemical and laboratory", "نفايات طبية من العيادات: معدية وأدوات حادة وكيميائية ومعملية")] },
        { title: t("Chute system", "نظام أنابيب النفايات"), items: [t("Automatic cleaning and disinfection with motorised nylon brushes", "تنظيف وتطهير آلي بفرش نايلون بمحركات"), t("Stainless, fire-resistant intake doors with electromagnetic locks", "أبواب إدخال من فولاذ مقاوم للصدأ والحريق بأقفال كهرومغناطيسية"), t("Ventilation units with insect barriers", "وحدات تهوية بموانع للحشرات")] },
        { title: t("Compactors", "جهاز ضغط النفايات"), items: [t("Standalone and vertical units for limited spaces such as restaurants and shops", "ضاغطات مستقلة وعمودية للأماكن المحدودة كالمطاعم والمحلات"), t("Stationary and horizontal units for large commercial volumes", "ضاغطات ثابتة وأفقية للكميات الكبيرة")] },
      ],
    },
    cta: enquiry(l, "enquire", "partner"),
  };
}

export function partnersBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  return {
    accord: {
      kind: "groups", id: "accord", eyebrow: "ACCORD", lines: [t("Management and", "الإدارة و"), t("*operations*", "*التشغيل*")], tone: "light",
      body: t("ACCORD is the management and operations partner of Rawasin Mall. Its documented role covers:", "أكورد هي شريك الإدارة والتشغيل لمول رواسين. ويشمل دورها الموثّق:"),
      groups: [
        { title: t("Property services", "الخدمات العقارية"), items: [t("Comprehensive property services that maintain quality and efficiency", "خدمات عقارية شاملة للحفاظ على الجودة والكفاءة"), t("Maintenance, cleaning and care of facilities", "الصيانة والنظافة والعناية بالمرافق")] },
        { title: t("Visitor experience", "تجربة الزائر"), items: [t("Support for visitor circulation and access to services", "دعم حركة الزوار والوصول إلى الخدمات"), t("Readiness of shared areas", "جاهزية المساحات المشتركة")] },
        { title: t("Brands and services", "العلامات والخدمات"), items: [t("Operational expertise, partnerships and franchises that bring distinctive brands and services to the mall", "خبرات تشغيلية وشراكات وامتيازات تجارية تجذب علامات وخدمات متميزة إلى المول")] },
      ],
    },
    technology: {
      kind: "split", id: "we", eyebrow: "WE", lines: [t("Connectivity and", "الاتصال و"), t("*smart services*", "*الخدمات الذكية*")],
      body: [
        t("WE (Telecom Egypt) is the technology partner of Rawasin. Rawasin Mall features advanced technology infrastructure in partnership with WE, Egypt's leading telecommunications provider.", "المصرية للاتصالات (WE) هي الشريك التكنولوجي لمشروع رواسين. ويتميز مول رواسين ببنية تكنولوجية متطورة بالشراكة مع WE، المشغل الرائد للاتصالات في مصر."),
        t("In the residential compound, WE supports fibre connectivity to the homes for internet, landline and digital television.", "وفي الكمبوند السكني، تدعم WE الاتصال بالألياف الضوئية إلى الوحدات للإنترنت والهاتف الأرضي والتلفزيون الرقمي."),
      ],
      points: [t("Fibre to the home (FTTH) for every residential unit", "ألياف ضوئية (FTTH) لكل وحدة سكنية"), t("Triple Play: internet, landline and digital TV (IPTV)", "باقة Triple Play: إنترنت وهاتف أرضي وتلفزيون رقمي (IPTV)"), t("A network ready to support current and future smart services", "شبكة قابلة لدعم الخدمات الذكية الحالية والمستقبلية")],
      image: R.aerial3,
      reverse: true,
    },
    design: {
      kind: "cards", id: "design-supervision", eyebrow: t("Design and supervision", "التصميم والإشراف"), lines: [t("From design to", "من التصميم إلى"), t("*site*", "*الموقع*")], cols: 2, tone: "light",
      items: [
        { title: "Dar Arafa Architecture", body: t("Architectural direction of Rawasin, led by architect Walid Arafa, giving the project a design identity that combines elegance, authenticity and modern design.", "التوجيه المعماري لمشروع رواسين بقيادة المهندس وليد عرفة، بما يمنحه هوية تصميمية تجمع بين الرقي والأصالة والحداثة.") },
        {
          title: t("Middle East Engineering Consultants", "مكتب الشرق الأوسط للاستشارات الهندسية"),
          body: t("General supervision of execution and follow-up of the works on site.", "الإشراف العام على التنفيذ ومتابعة سير الأعمال بالموقع."),
          points: [t("Checks quality and compliance with technical specifications and contracts", "مراجعة جودة الأعمال ومطابقتها للمواصفات الفنية والعقود"), t("Tracks the schedule and approves each stage before the next", "متابعة الجدول الزمني واعتماد كل مرحلة قبل التالية")],
        },
      ],
    },
    cta: enquiry(l, "enquire", "partner"),
  };
}

export function mallLocationBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const m = rawasinMall[l];
  return {
    positioning: {
      kind: "split", id: "positioning", eyebrow: t("Where it is", "الموقع"), lines: [t("Southern expansion of", "التوسعات الجنوبية لـ"), t("*New Sohag*", "*سوهاج الجديدة*")],
      body: m.location.body,
      points: [t("Within Rawasin, alongside the homes, mosque and clubhouse", "داخل رواسين، بجوار البيوت والمسجد والنادي الاجتماعي"), t("Directly connected to the airport highway via the New Airport Axis", "متصل مباشرة بطريق المطار السريع عبر محور المطار الجديد")],
      image: B.locationMap,
    },
    banner: { kind: "banner", id: "location-banner", image: M.nightStreet },
    site: {
      kind: "facts", id: "site", eyebrow: t("The site", "الموقع التفصيلي"), lines: [t("Land and", "الأرض و"), t("*frontage*", "*الواجهة*")], tone: "light",
      body: t("The mall's prominent position and visibility along key routes support the success of the businesses within it.", "يدعم موقع المول الظاهر على أهم المحاور نجاح الأنشطة داخله."),
      items: [
        { label: t("Commercial land area", "مساحة الأرض التجارية"), value: MALL.land.replace("m²", t("m²", "م²")) },
        { label: t("Frontage", "طول الواجهة"), value: t("123 metres", "123 مترًا") },
        { label: t("Levels", "المستويات"), value: "5" },
      ],
    },
    community: {
      kind: "split", id: "community", eyebrow: t("Within Rawasin", "داخل رواسين"), lines: [t("Part of a", "جزء من"), t("*complete community*", "*مجتمع متكامل*")],
      body: t("Located within Rawasin, the mall brings shopping and services closer to home, creating an integrated community that combines residential living, everyday convenience and a modern lifestyle.", "يقع المول داخل مشروع رواسين، فيقرّب التسوق والخدمات من البيت ويصنع مجتمعًا متكاملًا يجمع بين السكن والخدمات ونمط الحياة العصري."),
      link: { ...rawasinLink("residential"), label: t("Rawasin residential", "رواسين السكني") },
      image: R.aerial2,
      reverse: true,
    },
    cta: enquiry(l, "enquire", "commercial"),
  };
}
