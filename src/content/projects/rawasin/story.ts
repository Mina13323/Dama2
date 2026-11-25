/**
 * Rawasin compound story: architecture, smart infrastructure, clubhouse, mosque,
 * services and partners. Transcribed from the DAMA "Rawasin Compound brochure Content"
 * deck. Internal operating data (pricing, fractional ownership) is deliberately excluded.
 */
import type { Locale } from "../../index";

type Block = { title: string; body: string };
type Stat = { value: string; label: string };

export interface RawasinStory {
  architecture: { eyebrow: string; titleLines: string[]; body: string; stats: Stat[]; points: Block[] };
  smart: { eyebrow: string; titleLines: string[]; body: string; groups: { title: string; items: string[]; tag: string; conditional?: boolean }[]; note: string };
  clubhouse: { eyebrow: string; titleLines: string[]; body: string; floors: { level: string; title: string; body: string }[] };
  mosque: { eyebrow: string; titleLines: string[]; body: string };
  services: { eyebrow: string; titleLines: string[]; body: string; items: string[] };
  partners: { eyebrow: string; titleLines: string[]; items: { name: string; role: string }[] };
  videos: {
    residential: { eyebrow: string; titleLines: string[]; body: string; label: string };
    mosque: { eyebrow: string; titleLines: string[]; body: string; label: string };
  };
}

const en: RawasinStory = {
  architecture: {
    eyebrow: "Architectural Identity",
    titleLines: ["Rooted in Stone,", "*Shaped by Light*"],
    body: "Rawasin draws on Egyptian architecture through stone, courtyards and patterned screens. Hashemi stone gives the façades a natural texture, while entrances, balconies and planted spaces share one architectural language.",
    stats: [
      { value: "30 cm", label: "Hashemi stone walls: two 12 cm layers around a 6 cm air cavity" },
      { value: "10 m+", label: "Minimum distance between buildings" },
      { value: "196", label: "Homes across 7 residential buildings" },
      { value: "7.5", label: "Feddans of planted community" },
    ],
    points: [
      { title: "Courtyards", body: "Planted courtyards bring outdoor life into the heart of Rawasin, with paths that connect entrances to places to sit, meet neighbours and spend time with family." },
      { title: "Privacy", body: "Windows and balconies are arranged to limit direct views between homes, and patterned screens add privacy while admitting daylight and air." },
      { title: "Daylight", body: "Living spaces and openings are oriented for natural light and ventilation. As the sun moves, shadows reveal different details across the stonework." },
      { title: "Green rooftops", body: "Rooftops extend shared life above the courtyards with open-air seating, planting and spaces for community activities." },
      { title: "Solar lighting", body: "Solar panels supply part of the lighting demand of the shared spaces, reducing the compound's use of grid electricity." },
      { title: "Comfort in the wall", body: "The double-layer stone wall with its air cavity helps reduce the transfer of heat and sound into the home." },
    ],
  },
  smart: {
    eyebrow: "Smart Compound",
    titleLines: ["Smart Infrastructure,", "*Everyday Ease*"],
    body: "Rawasin connects its services through integrated digital systems for comfort, security and efficient operation.",
    groups: [
      { title: "Security & access", tag: "Part of the project", items: ["Smart surveillance cameras", "Smart entry and exit gates with access control", "Intercom systems"] },
      { title: "Efficient operation", tag: "Part of the project", items: ["Smart electricity and water meters", "Energy-efficient smart street lighting", "Solar-powered shared lighting"] },
      { title: "Smart Home Ready", tag: "Depends on unit package", conditional: true, items: ["Lighting control", "Air-conditioning control", "Curtains and connected devices", "Remote home management from a mobile phone"] },
      { title: "Connectivity by WE", tag: "Part of the project", items: ["Fibre to the home (FTTH) for every unit", "Triple Play: internet, landline and digital TV (IPTV)", "A network ready for future smart services"] },
    ],
    note: "Groups tagged \"Part of the project\" describe project-wide infrastructure. Smart Home Ready controls depend on the unit specification and the selected package; the actual capabilities are set by each unit's equipment.",
  },
  clubhouse: {
    eyebrow: "The Clubhouse",
    titleLines: ["A Place to", "*Come Together*"],
    body: "The clubhouse brings learning, work, fitness, reading and dining together in one building, with a padel court on the roof.",
    floors: [
      { level: "Ground", title: "Learning & shops", body: "Reception leads to three classrooms and three shops, with two administrative offices, an archive and a service pantry." },
      { level: "First", title: "Fitness & work", body: "A gym with changing areas, four workspaces, two meeting rooms, reception and a coffee corner." },
      { level: "Second", title: "Library & dining", body: "A reading and lending library with study spaces, documentary viewing and an audiobook area, opposite a restaurant and kitchen." },
      { level: "Third", title: "Rooms", body: "Thirteen numbered rooms of 31–49 m² on a shared corridor connected to the stair and lift." },
      { level: "Fourth", title: "Rooms", body: "A further thirteen rooms of 31–49 m² arranged around the shared corridor." },
      { level: "Roof", title: "Padel court", body: "An outdoor padel court connected to the building's stair and lift core." },
    ],
  },
  mosque: {
    eyebrow: "Rawasin Mosque",
    titleLines: ["A Place for", "*Serenity*"],
    body: "With its stone façades and slender minaret, Rawasin Mosque shares the project's architectural language. Inside, daylight reveals the mihrab, Arabic calligraphy and the depth of the stone openings. Close to the homes, it is a place for daily prayer and a recurring part of community life.",
  },
  services: {
    eyebrow: "Services",
    titleLines: ["Everything Your", "*Day Needs*"],
    body: "Services and shared spaces come together to make daily life easier.",
    items: [
      "Underground parking, wide entrances and lifts",
      "A nursery within the project",
      "Clubhouse for learning, work, reading and sport",
      "Supermarket, pharmacy and Rawasin Mall",
      "Shared-area operations and waste management",
      "Fibre connectivity to every home",
    ],
  },
  partners: {
    eyebrow: "Partners",
    titleLines: ["Built With", "*Trusted Partners*"],
    items: [
      { name: "Dar Arafa Architecture", role: "Architectural direction, led by Walid Arafa" },
      { name: "WE (Telecom Egypt)", role: "Fibre connectivity: internet, landline and digital TV" },
      { name: "ACCORD", role: "Day-to-day facilities management of Rawasin Mall" },
      { name: "Middle East Engineering Consultants", role: "Site supervision, compliance review and quality control" },
      { name: "Approved finishing offices", role: "Kayan, MA + Partners, Salah Donqol and Tecno House: design coordination and finishing supervision" },
    ],
  },
  videos: {
    residential: {
      eyebrow: "Film",
      titleLines: ["Walk Through", "*Rawasin*"],
      body: "From the gate, through the planted paths and courtyards, to the underground parking and the stone façades.",
      label: "Rawasin residential film",
    },
    mosque: {
      eyebrow: "Film",
      titleLines: ["Rawasin", "*Mosque*"],
      body: "The minaret, the calligraphy panel and the prayer hall, seen in changing light.",
      label: "Rawasin Mosque film",
    },
  },
};

const ar: RawasinStory = {
  architecture: {
    eyebrow: "الهوية المعمارية",
    titleLines: ["متجذّرة في الحجر،", "*تصوغها الضوء*"],
    body: "يستلهم رواسين من العمارة المصرية الحجر والأفنية والحواجز المفرّغة. ويمنح الحجر الهاشمي الواجهات ملمسًا طبيعيًا، بينما تشترك المداخل والشرفات والمساحات المزروعة في لغة معمارية واحدة.",
    stats: [
      { value: "٣٠ سم", label: "حوائط من الحجر الهاشمي: طبقتان بسمك ١٢ سم وبينهما فراغ هوائي ٦ سم" },
      { value: "+١٠ م", label: "أقل مسافة بين المباني" },
      { value: "١٩٦", label: "وحدة في ٧ مبانٍ سكنية" },
      { value: "٧٫٥", label: "فدان من المجتمع المزروع" },
    ],
    points: [
      { title: "الأفنية", body: "تُدخل الأفنية الخضراء الحياة في الهواء الطلق إلى قلب رواسين، بممرات تربط المداخل بأماكن للجلوس واللقاء وقضاء الوقت مع العائلة." },
      { title: "الخصوصية", body: "يراعي توزيع النوافذ والشرفات الحد من الإطلالات المباشرة بين الوحدات، وتضيف الحواجز المفرّغة خصوصية مع مرور الضوء والهواء." },
      { title: "الضوء الطبيعي", body: "يستفيد توجيه مساحات المعيشة والفتحات من ضوء النهار والتهوية الطبيعية، ومع حركة الشمس تتبدّل الظلال على الحجر." },
      { title: "الأسطح الخضراء", body: "تمتد الحياة المشتركة فوق الأفنية بجلسات مفتوحة ومساحات مزروعة وأماكن للأنشطة المجتمعية." },
      { title: "الإنارة بالطاقة الشمسية", body: "تغطي الألواح الشمسية جزءًا من احتياج إنارة المساحات المشتركة، وتقلل استخدام كهرباء الشبكة." },
      { title: "راحة في الحائط", body: "يساعد الحائط الحجري المزدوج بفراغه الهوائي على الحد من انتقال الحرارة والصوت إلى داخل المنزل." },
    ],
  },
  smart: {
    eyebrow: "سمارت كمبوند",
    titleLines: ["بنية تحتية ذكية،", "*وراحة يومية*"],
    body: "يربط رواسين خدماته بأنظمة رقمية متكاملة لتوفير الراحة والأمان وكفاءة التشغيل.",
    groups: [
      { title: "الأمان والدخول", tag: "ضمن المشروع", items: ["كاميرات مراقبة ذكية", "بوابات دخول وخروج ذكية مع التحكم في الدخول", "أنظمة إنتركم"] },
      { title: "كفاءة التشغيل", tag: "ضمن المشروع", items: ["عدادات كهرباء ومياه ذكية", "أعمدة إنارة ذكية موفرة للطاقة", "إنارة المساحات المشتركة بالطاقة الشمسية"] },
      { title: "جاهز للمنزل الذكي", tag: "حسب تجهيز الوحدة والباقة", conditional: true, items: ["التحكم في الإضاءة", "التحكم في التكييف", "التحكم في الستائر والأجهزة الذكية", "إدارة المنزل عن بُعد عبر الهاتف المحمول"] },
      { title: "الاتصال عبر WE", tag: "ضمن المشروع", items: ["ألياف ضوئية (FTTH) لكل وحدة", "باقة Triple Play: إنترنت وتليفون أرضي وتلفزيون رقمي (IPTV)", "شبكة جاهزة للخدمات الذكية المستقبلية"] },
    ],
    note: "المجموعات الموسومة «ضمن المشروع» تصف بنية على مستوى المشروع. أما تجهيزات المنزل الذكي فتتوقف على مواصفات الوحدة والباقة المختارة، وتتحدد الإمكانات الفعلية وفق تجهيز كل وحدة.",
  },
  clubhouse: {
    eyebrow: "النادي الاجتماعي",
    titleLines: ["مكان", "*للالتقاء*"],
    body: "يجمع النادي بين التعلّم والعمل والرياضة والقراءة وتناول الطعام في مبنى واحد، مع ملعب بادل على السطح.",
    floors: [
      { level: "الأرضي", title: "التعلّم والمحال", body: "يؤدي الاستقبال إلى ثلاثة فصول دراسية وثلاثة محال، مع مكتبين إداريين وأرشيف وركن خدمات." },
      { level: "الأول", title: "الرياضة والعمل", body: "جيم مع منطقة تغيير ملابس، وأربع مساحات للعمل وغرفتا اجتماعات، واستقبال وركن للقهوة." },
      { level: "الثاني", title: "المكتبة والمطعم", body: "مكتبة بصالة للقراءة وقسم للاستعارة ومناطق مذاكرة ومشاهدة وثائقية وكتب مسموعة، يقابلها مطعم ومطبخ." },
      { level: "الثالث", title: "الغرف", body: "١٣ غرفة مرقّمة بمساحات من ٣١ إلى ٤٩ م² على ممر مشترك مرتبط بالسلم والمصعد." },
      { level: "الرابع", title: "الغرف", body: "١٣ غرفة أخرى بمساحات من ٣١ إلى ٤٩ م² حول الممر المشترك." },
      { level: "السطح", title: "ملعب بادل", body: "ملعب بادل مفتوح متصل بنواة السلم والمصعد." },
    ],
  },
  mosque: {
    eyebrow: "مسجد رواسين",
    titleLines: ["مساحة", "*للسكينة*"],
    body: "بواجهاته الحجرية ومئذنته الرفيعة، يشترك مسجد رواسين مع المشروع في لغته المعمارية. وفي الداخل يكشف ضوء النهار عن المحراب والخط العربي وعمق الفتحات الحجرية. وهو قريب من المنازل، مكانٌ للصلاة اليومية وجزء متكرر من حياة المجتمع.",
  },
  services: {
    eyebrow: "الخدمات",
    titleLines: ["كل ما يحتاجه", "*يومك*"],
    body: "تتكامل الخدمات والمساحات المشتركة لتجعل الحياة اليومية أسهل.",
    items: [
      "مواقف سيارات تحت الأرض ومداخل واسعة ومصاعد",
      "حضانة داخل المشروع",
      "نادٍ للتعلّم والعمل والقراءة والرياضة",
      "سوبر ماركت وصيدلية ورواسين مول",
      "تشغيل المساحات المشتركة وإدارة المخلفات",
      "ألياف ضوئية لكل منزل",
    ],
  },
  partners: {
    eyebrow: "الشركاء",
    titleLines: ["بُني مع", "*شركاء موثوقين*"],
    items: [
      { name: "دار عرفة للعمارة", role: "التوجيه المعماري بقيادة المهندس وليد عرفة" },
      { name: "WE (المصرية للاتصالات)", role: "الألياف الضوئية: إنترنت وتليفون أرضي وتلفزيون رقمي" },
      { name: "أكورد", role: "إدارة المرافق اليومية لرواسين مول" },
      { name: "المكتب الاستشاري Middle East Engineering Consultants", role: "الإشراف على الموقع ومراجعة المطابقة ومراقبة الجودة" },
      { name: "مكاتب التشطيب المعتمدة", role: "Kayan وMA + Partners وSalah Donqol وTecno House: تنسيق التصميم والإشراف على التشطيب" },
    ],
  },
  videos: {
    residential: {
      eyebrow: "فيلم",
      titleLines: ["جولة في", "*رواسين*"],
      body: "من البوابة، مرورًا بالممرات المزروعة والأفنية، إلى مواقف السيارات تحت الأرض والواجهات الحجرية.",
      label: "فيلم رواسين السكني",
    },
    mosque: {
      eyebrow: "فيلم",
      titleLines: ["مسجد", "*رواسين*"],
      body: "المئذنة ولوحة الخط العربي وقاعة الصلاة في ضوء متغيّر.",
      label: "فيلم مسجد رواسين",
    },
  },
};

export const rawasinStory: Record<Locale, RawasinStory> = { en, ar };
