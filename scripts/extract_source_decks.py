from pathlib import Path
from pptx import Presentation

FILES = [
    Path(r"G:\Dama Development\Reseidential\Collab orientation.pptx"),
    Path(r"G:\Dama Development\Reseidential\Rawasin Compound brochure Content.pptx"),
]

for source in FILES:
    print(f"\n===== {source.name} =====")
    for number, slide in enumerate(Presentation(source).slides, 1):
        text = []
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text.strip():
                text.append(shape.text.strip())
        print(f"\n[SLIDE {number}]\n" + "\n".join(text))
