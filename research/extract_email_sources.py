#!/usr/bin/env python3
"""Extract readable copy and attachments from Coco Atelier source emails.

The source .eml files remain untouched. Attachments are prefixed with the
source email number so repeated Outlook filenames never collide.
"""

from __future__ import annotations

import csv
import email
import re
from email import policy
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "research" / "source-emails"
TEXT_DIR = ROOT / "research" / "email-text"
IMAGE_DIR = ROOT / "research" / "raw-images"
MANIFEST = ROOT / "research" / "source-manifest.csv"


def safe_name(value: str) -> str:
    value = Path(value).name
    return re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-") or "attachment"


def main() -> None:
    TEXT_DIR.mkdir(parents=True, exist_ok=True)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    rows: list[dict[str, str | int]] = []

    for email_number, source_path in enumerate(sorted(SOURCE_DIR.glob("*.eml")), start=1):
        with source_path.open("rb") as source:
            message = email.message_from_binary_file(source, policy=policy.default)

        plain_parts: list[str] = []
        html_parts: list[str] = []
        attachment_number = 0

        for part in message.walk():
            filename = part.get_filename()
            disposition = part.get_content_disposition()
            content_type = part.get_content_type()

            if filename or disposition == "attachment":
                payload = part.get_payload(decode=True) or b""
                original_name = safe_name(filename or f"attachment-{attachment_number}")
                output_name = f"email-{email_number:02d}_{attachment_number:03d}_{original_name}"
                output_dir = IMAGE_DIR if content_type.startswith("image/") else TEXT_DIR
                output_path = output_dir / output_name
                output_path.write_bytes(payload)
                rows.append(
                    {
                        "source_email": source_path.name,
                        "attachment_number": attachment_number,
                        "original_name": original_name,
                        "saved_path": output_path.relative_to(ROOT).as_posix(),
                        "content_type": content_type,
                        "bytes": len(payload),
                    }
                )
                attachment_number += 1
                continue

            if content_type == "text/plain":
                try:
                    plain_parts.append(part.get_content())
                except (LookupError, UnicodeDecodeError):
                    plain_parts.append((part.get_payload(decode=True) or b"").decode("utf-8", "replace"))
            elif content_type == "text/html":
                try:
                    html_parts.append(part.get_content())
                except (LookupError, UnicodeDecodeError):
                    html_parts.append((part.get_payload(decode=True) or b"").decode("utf-8", "replace"))

        base_name = f"email-{email_number:02d}"
        header = (
            f"Subject: {message.get('subject', '')}\n"
            f"From: {message.get('from', '')}\n"
            f"To: {message.get('to', '')}\n"
            f"Date: {message.get('date', '')}\n\n"
        )
        (TEXT_DIR / f"{base_name}.txt").write_text(
            header + "\n\n".join(plain_parts), encoding="utf-8"
        )
        if html_parts:
            (TEXT_DIR / f"{base_name}.html").write_text(
                "\n\n".join(html_parts), encoding="utf-8"
            )

    with MANIFEST.open("w", newline="", encoding="utf-8") as manifest:
        writer = csv.DictWriter(
            manifest,
            fieldnames=[
                "source_email",
                "attachment_number",
                "original_name",
                "saved_path",
                "content_type",
                "bytes",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    main()
