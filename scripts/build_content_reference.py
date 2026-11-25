from __future__ import annotations

from collections import defaultdict
from datetime import date
import json
from pathlib import Path
import re
import sys

from html import unescape
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "vendor"))
from arabic_reshaper import reshape as reshape_arabic
from bidi.algorithm import get_display as bidi_display
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table,
    TableStyle,
)

OUT = ROOT / "output" / "pdf" / "dama-website-content-reference.pdf"
SITE = ROOT / "out"
SOURCE_LIBRARY = Path(r"G:\Dama Development")

CANONICAL = [
    ("/en/", "Home", "English"),
    ("/en/about/", "About DAMA", "English"),
    ("/en/projects/", "Our Developments", "English"),
    ("/en/projects/rawasin/", "Rawasin", "English"),
    ("/en/projects/rawasin/mall/", "Rawasin Mall", "English"),
    ("/en/projects/dama-residence/", "DAMA Residence", "English"),
    ("/en/projects/dama-view/", "DAMA View", "English"),
    ("/en/news/", "News & Media", "English"),
    ("/en/careers/", "Careers", "English"),
    ("/en/contact/", "Contact", "English"),
    ("/en/privacy-policy/", "Privacy Policy", "English"),
    ("/en/terms-of-use/", "Terms of Use", "English"),
    ("/ar/", "الرئيسية", "Arabic"),
    ("/ar/about/", "عن داما", "Arabic"),
    ("/ar/projects/", "مشروعاتنا", "Arabic"),
    ("/ar/projects/rawasin/", "رواسين", "Arabic"),
    ("/ar/projects/rawasin/mall/", "مول رواسين", "Arabic"),
    ("/ar/projects/dama-residence/", "DAMA Residence", "Arabic"),
    ("/ar/projects/dama-view/", "DAMA View", "Arabic"),
    ("/ar/news/", "الأخبار والإعلام", "Arabic"),
    ("/ar/careers/", "الوظائف", "Arabic"),
    ("/ar/contact/", "تواصل معنا", "Arabic"),
    ("/ar/privacy-policy/", "سياسة الخصوصية", "Arabic"),
    ("/ar/terms-of-use/", "شروط الاستخدام", "Arabic"),
]

def safe(text: str) -> str:
    text = re.sub(r"\s+", " ", text or "").strip()
    return (text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

def html_path(url: str) -> Path:
    bits = [p for p in url.split("/") if p]
    return SITE.joinpath(*bits, "index.html") if bits else SITE / "index.html"

def humanize(key: str) -> str:
    return re.sub(r"(?<!^)([A-Z])", r" \1", str(key)).replace("_", " ").title()

def content_for(data, page_key, locale):
    d = data[locale]
    if page_key == "Home":
        return {key: d[key] for key in ("hero", "statsLabel", "statsSource", "stats", "story", "projects", "lifestyle", "values", "news", "cta")}
    if page_key == "About DAMA": return d["about"]
    if page_key == "Our Developments": return {"page": d["projectsPage"], "portfolio": data["projects"]}
    if page_key == "Rawasin Mall": return data["rawasin"]["rawasinMall"]
    if page_key in {"Rawasin", "DAMA Residence", "DAMA View"}:
        slug = {"Rawasin":"rawasin", "DAMA Residence":"dama-residence", "DAMA View":"dama-view"}[page_key]
        return next((x for x in data["projects"] if x.get("slug") == slug), {})
    if page_key == "News & Media": return {"page": d["newsPage"], "approvedArticles": data.get("news", [])}
    if page_key == "Careers": return {"page": d["careersPage"], "approvedVacancies": data.get("careers", [])}
    if page_key == "Contact": return d["contactPage"]
    if page_key == "Privacy Policy": return d["privacyPage"]
    if page_key == "Terms of Use": return d["termsPage"]
    return {}

def display_text(value, rtl=False):
    value = str(value)
    return bidi_display(reshape_arabic(value)) if rtl and re.search(r"[\u0600-\u06FF]", value) else value

def story_from_content(value, styles, depth=0, rtl=False):
    h2, body, small = styles
    result = []
    if isinstance(value, dict):
        for key, item in value.items():
            label = humanize(key)
            if isinstance(item, (dict, list)):
                result.append(Paragraph(safe(label), h2 if depth < 2 else small))
                result.extend(story_from_content(item, styles, depth + 1, rtl))
            elif item not in (None, "", False, []):
                result.append(Paragraph(f"<b>{safe(label)}:</b> {safe(display_text(item, rtl))}", body))
    elif isinstance(value, list):
        for index, item in enumerate(value, 1):
            if isinstance(item, (dict, list)):
                result.append(Paragraph(f"<b>Item {index}</b>", small))
                result.extend(story_from_content(item, styles, depth + 1, rtl))
            else:
                result.append(Paragraph(f"• {safe(display_text(item, rtl))}", body))
    elif value not in (None, "", False):
        result.append(Paragraph(safe(display_text(value, rtl)), body))
    return result

def assets():
    result = defaultdict(list)
    if not SOURCE_LIBRARY.exists():
        return result
    for f in SOURCE_LIBRARY.rglob("*"):
        if f.is_file():
            key = f.suffix.lower().lstrip(".") or "other"
            result[key].append(f)
    return result

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#E7E2DC"))
    canvas.line(doc.leftMargin, 13 * mm, A4[0] - doc.rightMargin, 13 * mm)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#687076"))
    canvas.drawString(doc.leftMargin, 8.5 * mm, "DAMA Website Content Reference - update-ready working document")
    canvas.drawRightString(A4[0] - doc.rightMargin, 8.5 * mm, f"Page {doc.page}")
    canvas.restoreState()

def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    pdfmetrics.registerFont(TTFont("Arabic", r"C:\Windows\Fonts\tahoma.ttf", shapable=False))
    title = ParagraphStyle("TitleX", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=30, textColor=colors.HexColor("#C51E28"), alignment=TA_CENTER, spaceAfter=10)
    subtitle = ParagraphStyle("Sub", parent=styles["Normal"], fontSize=10.5, leading=15, textColor=colors.HexColor("#535B60"), alignment=TA_CENTER)
    h1 = ParagraphStyle("H1X", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=17, leading=22, textColor=colors.HexColor("#14171A"), spaceBefore=10, spaceAfter=8)
    h2 = ParagraphStyle("H2X", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=16, textColor=colors.HexColor("#C51E28"), spaceBefore=9, spaceAfter=4)
    body = ParagraphStyle("BodyX", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.9, leading=12.4, textColor=colors.HexColor("#293136"), spaceAfter=3)
    small = ParagraphStyle("SmallX", parent=body, fontSize=7.7, leading=10.3, textColor=colors.HexColor("#596268"))
    ar_h2 = ParagraphStyle("ArabicH2", parent=h2, fontName="Arabic", alignment=2, leading=18)
    ar_body = ParagraphStyle("ArabicBody", parent=body, fontName="Arabic", alignment=2, leading=16)
    ar_small = ParagraphStyle("ArabicSmall", parent=small, fontName="Arabic", alignment=2, leading=14)
    story = []
    story += [Spacer(1, 48 * mm), Paragraph("DAMA WEBSITE", title), Paragraph("Content reference and source-library inventory", title), Spacer(1, 4 * mm), Paragraph(f"Prepared {date.today().strftime('%d %B %Y')} from the compiled DAMA website and the supplied Dama Development library.", subtitle), Spacer(1, 12 * mm), Paragraph("Purpose", h2), Paragraph("A practical record of every published canonical page, its visible sections and editable copy. Use it as the handoff document for future website updates. English and Arabic pages are recorded separately; URL aliases are listed rather than repeated.", body), Spacer(1, 8 * mm), Paragraph("Update boundary", h2), Paragraph("Published website copy lives primarily in src/content/. Page templates live in src/app/ and src/components/. The external Dama Development folder is an approved-source library containing brochures, presentations, video and visual assets; its media is catalogued in the appendix and is not automatically published.", body), PageBreak()]

    story += [Paragraph("Contents and update map", h1)]
    toc = [["Area", "What to update", "Primary source"]]
    toc += [
        ["Global navigation / labels", "UI text, contact visibility, legal status", "src/content/site.ts, en.ts, ar.ts"],
        ["Home + About", "Corporate copy and feature sections", "src/content/en.ts, ar.ts; components/sections, components/about"],
        ["Projects", "Cards, hierarchy and development details", "src/content/projects.ts"],
        ["Rawasin Mall", "Mall facts, floors, schedules, partners and media", "src/content/projects/rawasin/ (mall, media, story, blocks)"],
        ["News / Careers", "Approved articles and vacancies", "src/content/news.ts, careers.ts"],
        ["Source media", "Brochures, renders, videos and presentations", "G:\\Dama Development"],
    ]
    table = Table(toc, colWidths=[35 * mm, 67 * mm, 64 * mm], repeatRows=1)
    table.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#14171A")), ("TEXTCOLOR", (0,0), (-1,0), colors.white), ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"), ("FONTSIZE", (0,0), (-1,-1), 8), ("LEADING", (0,0), (-1,-1), 10), ("GRID", (0,0), (-1,-1), .25, colors.HexColor("#DDD8D2")), ("VALIGN", (0,0), (-1,-1), "TOP"), ("BACKGROUND", (0,1), (-1,-1), colors.HexColor("#FBFBFA")), ("TOPPADDING", (0,0), (-1,-1), 5), ("BOTTOMPADDING", (0,0), (-1,-1), 5)]))
    story += [table, Spacer(1, 8 * mm), Paragraph("Canonical coverage", h2), Paragraph("24 language-specific canonical routes are documented below. Compatibility aliases under /{locale}/developments and /{locale}/projects/rwasin redirect to canonical project URLs and intentionally do not duplicate content.", body), PageBreak()]

    data = json.loads((ROOT / "output" / "content-reference-data.json").read_text(encoding="utf-8"))
    page_keys = {
        "الرئيسية": "Home", "عن داما": "About DAMA", "مشروعاتنا": "Our Developments",
        "رواسين": "Rawasin", "مول رواسين": "Rawasin Mall", "الأخبار والإعلام": "News & Media",
        "الوظائف": "Careers", "تواصل معنا": "Contact", "سياسة الخصوصية": "Privacy Policy",
        "شروط الاستخدام": "Terms of Use",
    }
    for url, label, language in CANONICAL:
        locale = "en" if language == "English" else "ar"
        page_key = page_keys.get(label, label)
        if label == "Home":
            story += [Paragraph("English page content", h1)]
        if label == "الرئيسية":
            story += [Paragraph("Arabic page content", h1)]
        page_h2, page_body, page_small = (h2, body, small) if locale == "en" else (ar_h2, ar_body, ar_small)
        story += [Paragraph(safe(display_text(label, locale == "ar")), page_h2), Paragraph(f"<b>Route:</b> {safe(url)}", small)]
        section = content_for(data, page_key, locale)
        story += story_from_content(section, (page_h2, page_body, page_small), rtl=locale == "ar")
        story.append(Spacer(1, 5 * mm))
        story.append(Paragraph("Update path: use the matching structured content module; preserve explicit content-pending states until approved source material is available.", small))
        story.append(PageBreak())

    story += [Paragraph("Supplied source-library inventory", h1), Paragraph("This catalog records the external material available for future updates. It does not assert that each asset is approved for web publication; verify rights, final art direction and factual approval before publishing.", body)]
    indexed = assets()
    for ext in sorted(indexed):
        files = indexed[ext]
        story += [Paragraph(f"{ext.upper()} files ({len(files)})", h2)]
        rows = [["File", "Location", "Size"]]
        for f in files:
            rel = f.relative_to(SOURCE_LIBRARY)
            rows.append([f.name, str(rel.parent) if str(rel.parent) != "." else "Root", f"{f.stat().st_size / 1_048_576:.1f} MB"])
        t = Table(rows, colWidths=[70 * mm, 75 * mm, 21 * mm], repeatRows=1)
        t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.HexColor("#F3F2EF")), ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"), ("FONTSIZE", (0,0), (-1,-1), 7), ("LEADING", (0,0), (-1,-1), 9), ("GRID", (0,0), (-1,-1), .25, colors.HexColor("#E1DDD7")), ("VALIGN", (0,0), (-1,-1), "TOP"), ("TOPPADDING", (0,0), (-1,-1), 3), ("BOTTOMPADDING", (0,0), (-1,-1), 3)]))
        story += [t, Spacer(1, 4 * mm)]
    story += [PageBreak(), Paragraph("Ongoing-update checklist", h1), Paragraph("1. Confirm the source material and approvals. 2. Update the structured content module rather than hard-coding copy into components. 3. Add media in the relevant public/images location and confirm alt text. 4. Run lint, integrity tests and a production build. 5. Review English and Arabic pages at desktop and mobile widths. 6. Regenerate this reference after a material content release.", body), Spacer(1, 6 * mm), Paragraph("Important current content gates", h2), Paragraph("The project deliberately leaves several areas in content-pending status: unapproved corporate statistics, leadership profiles, company-wide impact content, news, vacancies, final legal copy and some Rawasin floor-plan / unit-schedule source material. Do not convert these states into factual marketing claims until DAMA provides approved sources.", body)]
    SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=22*mm, leftMargin=22*mm, topMargin=20*mm, bottomMargin=20*mm, title="DAMA Website Content Reference", author="Codex").build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)

if __name__ == "__main__":
    build()
