/**
 * Page content architecture (TASK 02).
 *
 * Structured sections that sit alongside the existing page components so every
 * main route has several meaningful sections. Every fact here is taken from the
 * four source documents (RAWASIN MALL Guideline, Rawasin Mall - Final, Rawasin
 * Compound brochure Content, Collab orientation) or derived from the verified
 * floor schedules in ./rawasin. Nothing is estimated. Open questions between the
 * documents are listed in docs/CONTENT-MAPPING.md, not silently resolved here.
 *
 * Deliberately NOT published (see docs/CONTENT-MAPPING.md): fractional-ownership
 * prices, the "up to 20%" operating-cost claim, the leadership/organisation
 * placeholders, and any per-apartment feature list (none is documented).
 */
import type { Locale } from "./index";
import { getDictionary } from "./index";
import { tr, type BlockLink, type BlockSet } from "./blocks";
import { brochureImg, mall, res } from "./assets";
import { rawasinLink } from "./projects/rawasin/links";

export * from "./blocks";
export * from "./projects/rawasin/blocks";

/* ------------------------------------------------------------------ */
/* Corporate                                                            */
/* ------------------------------------------------------------------ */
export function developmentsBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  const values = getDictionary(l).values.items;
  return {
    figures: {
      kind: "facts", id: "portfolio", eyebrow: t("The portfolio", "المحفظة"), lines: [t("DAMA's development,", "مشروع داما،"), t("*at a glance*", "*بنظرة سريعة*")],
      body: t("Rawasin is the development DAMA currently presents. It brings a residential community and a commercial destination together in New Sohag.", "رواسين هو المشروع الذي تعرضه داما حاليًا، ويجمع بين مجتمع سكني ووجهة تجارية في سوهاج الجديدة."),
      items: [
        { label: t("Location", "الموقع"), value: t("New Sohag", "سوهاج الجديدة"), note: t("Southern expansion, Upper Egypt", "التوسعات الجنوبية، صعيد مصر") },
        { label: t("Residential", "السكني"), value: t("196 homes", "196 وحدة"), note: t("In 7 buildings on 7.5 feddans", "في 7 مبانٍ على 7.5 فدان") },
        { label: t("Commercial", "التجاري"), value: t("5 levels", "5 مستويات"), note: t("Rawasin Mall, 6,280 m² of commercial land", "مول رواسين، على 6,280 م² أرضًا تجارية") },
        { label: t("Community", "المجتمع"), value: t("3 shared places", "3 أماكن مشتركة"), note: t("Mall, mosque and clubhouse within the project", "المول والمسجد والنادي الاجتماعي داخل المشروع") },
      ],
    },
    main: {
      kind: "split", id: "rawasin-main", eyebrow: t("Main development", "المشروع الرئيسي"), lines: [t("Rawasin,", "رواسين،"), t("*Solid by Name*", "*ثابت زي اسمه*")],
      body: t(
        "In New Sohag, Rawasin draws on Egyptian architecture to create an integrated community. Homes surround planted courtyards, with Hashemi stone façades shaped by light and shadow.",
        "في سوهاج الجديدة، يستلهم رواسين من العمارة المصرية إحساسها بالمكان ليشكّل مجتمعًا متكاملًا. تتوزع البيوت حول أفنية خضراء، وتتشكل الواجهات من الحجر الهاشمي وتفاصيل الظل والضوء.",
      ),
      points: [
        t("Rawasin Mall, Rawasin Mosque and the clubhouse complete everyday life within the project", "يكتمل مجتمع رواسين بمول رواسين ومسجد رواسين والنادي الاجتماعي"),
        t("Underground parking serves the residential buildings", "مواقف سيارات تحت الأرض تخدم المباني السكنية"),
        t("A smart compound: fibre connectivity, smart security and solar-lit shared areas", "سمارت كمبوند: ألياف ضوئية وأمن ذكي وإنارة المساحات المشتركة بالطاقة الشمسية"),
      ],
      images: [R.facadeCorner, B.courtyardPath],
      link: { ...rawasinLink("rawasin"), label: t("Explore Rawasin", "استكشف رواسين") },
    },
    branches: {
      kind: "cards", id: "branches", eyebrow: t("Two branches", "فرعان"), lines: [t("Residential", "السكني"), t("and *Commercial*", "و*التجاري*")], cols: 2,
      body: t("Rawasin has two distinct branches, each with its own pages. Choose the one that fits what you are looking for.", "لرواسين فرعان مستقلان، لكل منهما صفحاته الخاصة. اختر ما يناسب ما تبحث عنه."),
      items: [
        {
          tag: t("Residential", "سكني"), title: t("Rawasin Compound", "كمبوند رواسين"), image: R.facadeStreet,
          body: t("Seven residential buildings with 196 homes around planted courtyards. Five apartment layouts of two or three bedrooms, from 127.5 to 236 m².", "سبعة مبانٍ سكنية تضم 196 وحدة حول أفنية مزروعة. خمسة نماذج شقق من غرفتين أو ثلاث غرف بمساحات من 127.5 إلى 236 م²."),
          points: [t("Hashemi stone architecture and courtyards", "عمارة الحجر الهاشمي والأفنية"), t("Clubhouse, mosque, nursery and underground parking", "نادٍ اجتماعي ومسجد وحضانة ومواقف تحت الأرض"), t("Smart compound infrastructure", "بنية سمارت كمبوند")],
          link: { ...rawasinLink("residential"), label: t("Residential overview", "نظرة عامة على السكني") },
        },
        {
          tag: t("Commercial", "تجاري"), title: t("Rawasin Mall", "مول رواسين"), image: M.dayFront,
          body: t("A five-level mixed-use mall on 6,280 m² of commercial land with a 123 m frontage, bringing shopping, healthcare, fitness and entertainment together.", "مول متعدد الاستخدامات على خمسة مستويات على 6,280 م² أرضًا تجارية بواجهة 123 مترًا، يجمع التسوق والرعاية الصحية واللياقة والترفيه."),
          points: [t("Hypermarket, retail, restaurants and cafés", "هايبر ماركت ومحال ومطاعم ومقاهٍ"), t("22 clinic units, laboratories and an obstetrics and gynaecology department", "22 عيادة ومعامل وقسم للنساء والتوليد"), t("Gym, health club, beauty centre and kids area", "جيم ونادٍ صحي ومركز تجميل ومنطقة أطفال")],
          link: { ...rawasinLink("commercial"), label: t("Commercial overview", "نظرة عامة على التجاري") },
        },
      ],
    },
    approach: {
      kind: "cards", id: "approach", eyebrow: t("How DAMA develops", "كيف تطوّر داما"), lines: [t("Rooted in heritage,", "جذورنا في الأصالة،"), t("*built for today*", "*وبناؤنا لليوم*")],
      body: t("Rawasin is where DAMA's approach becomes visible in stone, courtyards and shared places.", "في رواسين يتجسد نهج داما في الحجر والأفنية والأماكن المشتركة."),
      items: [
        ...values.slice(0, 3).map((v, i) => ({ title: v.title, body: v.body, link: i === 2 ? ({ key: "about", label: t("About DAMA", "عن داما") } as BlockLink) : undefined })),
      ],
    },
  };
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */
export function aboutBlocks(l: Locale): BlockSet {
  const t = tr(l);
  const R = res(l);
  const M = mall(l);
  const B = brochureImg(l);
  return {
    philosophy: {
      kind: "cards", id: "philosophy", eyebrow: t("Development philosophy", "فلسفة التطوير"), lines: [t("Heritage and", "الأصالة و"), t("*modern living*", "*الحياة العصرية*")], cols: 2,
      body: t("DAMA builds places that feel like home, rooted in heritage, shaped by modern needs and built to last for generations. At Rawasin that approach takes concrete form.", "تبني داما أماكن تمنحك شعور الوطن؛ متجذّرة في الأصالة، ومصممة لتلبي الاحتياجات العصرية، ومستدامة للأجيال القادمة. وفي رواسين يتجسد هذا النهج."),
      items: [
        { title: t("Rooted in heritage", "جذور في الأصالة"), body: t("Rawasin draws on Egyptian architecture through Hashemi stone, courtyards and patterned screens.", "يستلهم رواسين من العمارة المصرية الحجر الهاشمي والأفنية والحواجز المفرّغة."), link: { ...rawasinLink("residential-architecture"), label: t("Architecture", "العمارة") } },
        { title: t("Shaped by modern needs", "تلبي الاحتياجات العصرية"), body: t("A smart compound with fibre connectivity, smart security and metering, and a mall for everyday needs.", "سمارت كمبوند بألياف ضوئية وأمن وعدادات ذكية، ومول لاحتياجات اليوم."), link: { ...rawasinLink("residential-lifestyle"), label: t("Smart living", "الحياة الذكية") } },
        { title: t("Sustainable", "مستدامة"), body: t("Solar-powered lighting for shared areas, daylight-oriented planning, double-layer stone walls and green rooftops.", "إنارة المساحات المشتركة بالطاقة الشمسية، وتخطيط يستفيد من ضوء النهار، وحوائط حجرية مزدوجة وأسطح خضراء."), link: { ...rawasinLink("residential-architecture"), label: t("Architecture", "العمارة") } },
        { title: t("Community-oriented", "تتمحور حول المجتمع"), body: t("Courtyards, a clubhouse, a mosque and a mall give residents places to meet close to home.", "أفنية ونادٍ اجتماعي ومسجد ومول تمنح السكان أماكن للقاء قريبة من البيت."), link: { ...rawasinLink("residential-lifestyle"), label: t("Lifestyle & amenities", "نمط الحياة والمرافق") } },
      ],
    },
    work: {
      kind: "split", id: "dama-rawasin", eyebrow: t("Our work", "أعمالنا"), lines: [t("Refined communities in", "مجتمعات راقية في"), t("*Upper Egypt*", "*صعيد مصر*")], tone: "light",
      body: t("DAMA brings ambition and vision to turn the cities of Upper Egypt into refined urban centres. Rawasin represents a step change in the idea of refined living in Sohag, where quality and design meet an authentic Egyptian identity.", "تجمع داما بين الطموح والرؤية لتحويل مدن الصعيد إلى مراكز حضرية راقية، من خلال مشاريع مثل رواسين التي تمثل نقلة نوعية في مفهوم السكن الراقي في محافظة سوهاج، حيث الجودة والتصميم والارتباط بالهوية المصرية الأصيلة."),
      points: [t("Residential compound: 7 buildings, 196 homes, 7.5 feddans", "كمبوند سكني: 7 مبانٍ و196 وحدة على 7.5 فدان"), t("Commercial destination: Rawasin Mall, five levels", "وجهة تجارية: رواسين مول على خمسة مستويات")],
      images: [R.facadeCourtyard, B.lobby],
      link: { key: "developments", label: t("Our developments", "مشروعاتنا") },
    },
  };
}
