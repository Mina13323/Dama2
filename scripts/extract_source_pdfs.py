from pathlib import Path
from pypdf import PdfReader

FILES = [
    Path(r"G:\Dama Development\Mall\RAWASIN MALL Guideline'.pdf"),
    Path(r"G:\Dama Development\Mall\Brochure\Rawasin Mall - Final.pdf"),
]

for source in FILES:
    print(f"\n===== {source.name} =====")
    for number, page in enumerate(PdfReader(source).pages, 1):
        print(f"\n[PAGE {number}]\n{page.extract_text() or '[image-only]'}")
