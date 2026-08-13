#!/usr/bin/env python3
"""Build labelled image contact sheets for editorial selection."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
INPUT_DIR = ROOT / "research" / "raw-images"
OUTPUT_DIR = ROOT / "research" / "contact-sheets"
THUMB_SIZE = (220, 220)
LABEL_HEIGHT = 46
COLUMNS = 5
PER_SHEET = 25


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    font = ImageFont.load_default(size=15)
    images = [
        path
        for path in sorted(INPUT_DIR.iterdir())
        if path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
        and path.stat().st_size > 20_000
    ]

    for sheet_number, offset in enumerate(range(0, len(images), PER_SHEET), start=1):
        batch = images[offset : offset + PER_SHEET]
        rows = math.ceil(len(batch) / COLUMNS)
        sheet = Image.new(
            "RGB",
            (COLUMNS * THUMB_SIZE[0], rows * (THUMB_SIZE[1] + LABEL_HEIGHT)),
            "#f1ece5",
        )
        draw = ImageDraw.Draw(sheet)

        for index, path in enumerate(batch):
            column = index % COLUMNS
            row = index // COLUMNS
            x = column * THUMB_SIZE[0]
            y = row * (THUMB_SIZE[1] + LABEL_HEIGHT)

            with Image.open(path) as source:
                source = ImageOps.exif_transpose(source).convert("RGB")
                thumb = ImageOps.fit(source, THUMB_SIZE, method=Image.Resampling.LANCZOS)
            sheet.paste(thumb, (x, y))
            label = path.stem.replace("email-", "e")
            draw.rectangle((x, y + THUMB_SIZE[1], x + THUMB_SIZE[0], y + THUMB_SIZE[1] + LABEL_HEIGHT), fill="#f8f5ef")
            draw.text((x + 8, y + THUMB_SIZE[1] + 12), label[:28], fill="#2f211c", font=font)

        sheet.save(OUTPUT_DIR / f"contact-sheet-{sheet_number:02d}.jpg", quality=90)


if __name__ == "__main__":
    main()
