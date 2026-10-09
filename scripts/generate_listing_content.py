#!/usr/bin/env python3
"""Generate IG/FB captions, hashtags, alt text, a reel script, and DM
automation copy for each listing folder under listings/, using Claude's
vision input. Replaces the old Make.com scenario — same prompt and output
shape, running as a GitHub Action instead.

Usage:
    python scripts/generate_listing_content.py              # only listings changed since BEFORE_SHA
    PROCESS_ALL=true python scripts/generate_listing_content.py   # every listing folder

Reads:
    listings/<listing-name>/*.jpg|*.jpeg|*.png   (up to 5 used per listing)
    listings/<listing-name>/notes.txt            (optional)
    prompts/luxury-listing-prompt.txt

Writes:
    content-calendar/<listing-name>.json
"""
import base64
import json
import os
import subprocess
import sys
from pathlib import Path

import anthropic

REPO_ROOT = Path(__file__).resolve().parent.parent
LISTINGS_DIR = REPO_ROOT / "listings"
OUTPUT_DIR = REPO_ROOT / "content-calendar"
PROMPT_FILE = REPO_ROOT / "prompts/luxury-listing-prompt.txt"

MODEL = "claude-opus-5-5"
MAX_IMAGES_PER_CALL = 5

# claude-opus-5-5 pricing, per million tokens (https://claude.com/pricing) — update
# here if pricing changes; used only for the cost estimate this script logs.
INPUT_PRICE_PER_MTOK = 4.00
OUTPUT_PRICE_PER_MTOK = 20.00

SYSTEM_PROMPT = (
    "You are my luxury real estate copywriter for L&R Homes in Rochester Hills, "
    "Michigan. You specialize in Oakland County luxury new construction like "
    "Pine Woods and The Grandeur. Your voice is confident, warm, high-end but "
    "not stuffy. Never say 'dream home', 'stunning', or 'gorgeous'."
)

# Same schema already reviewed and validated for the Make.com scenario this replaces.
OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "caption_editorial": {
            "type": "string",
            "description": "150-200 characters, editorial luxury tone, ends with 'Comment {{KEYWORD}} for details.'",
        },
        "caption_lifestyle": {
            "type": "string",
            "description": "150-200 characters, lifestyle/story tone",
        },
        "caption_feature": {
            "type": "string",
            "description": "150-200 characters, feature-driven, ends with 'DM TOUR'",
        },
        "hashtags": {
            "type": "string",
            "description": "25 space-separated hashtags: 5 luxury, 5 local Rochester Hills/Oakland County, 5 niche (e.g. modern colonial, brick exterior), 10 broad reach",
        },
        "first_comment_hook": {
            "type": "string",
            "description": "An engaging question about a specific detail visible in the photos",
        },
        "alt_text": {
            "type": "string",
            "description": "Accessibility description(s) covering what's shown across the submitted photos",
        },
        "reel_script": {
            "type": "object",
            "description": "A 12-second reel shot list, one line per beat",
            "properties": {
                "0-2s": {"type": "string"},
                "2-5s": {"type": "string"},
                "5-8s": {"type": "string"},
                "8-10s": {"type": "string"},
                "10-12s": {"type": "string"},
            },
            "required": ["0-2s", "2-5s", "5-8s", "8-10s", "10-12s"],
            "additionalProperties": False,
        },
        "dm_trigger_comment": {
            "type": "string",
            "description": "Reply to a comment on the listing, e.g. 'Thanks for the interest in {{listing}}... Want the private video tour + spec sheet? Reply YES.'",
        },
        "dm_trigger_yes": {
            "type": "string",
            "description": "The DM sent when someone replies YES - brochure link + calendar/booking link",
        },
    },
    "required": [
        "caption_editorial",
        "caption_lifestyle",
        "caption_feature",
        "hashtags",
        "first_comment_hook",
        "alt_text",
        "reel_script",
        "dm_trigger_comment",
        "dm_trigger_yes",
    ],
    "additionalProperties": False,
}

IMAGE_MEDIA_TYPES = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png"}


def changed_listing_names() -> set[str] | None:
    """Return the set of listing folder names touched since BEFORE_SHA, or
    None to mean "process every listing folder" (first push, force push,
    manual process_all, or local run with no git refs set)."""
    if os.environ.get("PROCESS_ALL", "").lower() == "true":
        return None

    before_sha = os.environ.get("BEFORE_SHA", "")
    after_sha = os.environ.get("AFTER_SHA", "HEAD")
    if not before_sha or before_sha == "0" * 40:
        return None

    try:
        diff = subprocess.run(
            ["git", "diff", "--name-only", before_sha, after_sha, "--", "listings/"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=True,
        ).stdout
    except subprocess.CalledProcessError:
        return None

    names = set()
    for line in diff.splitlines():
        parts = Path(line).parts
        if len(parts) >= 2 and parts[0] == "listings":
            names.add(parts[1])
    return names or None


def build_content(listing_folder: Path) -> list[dict]:
    images = sorted(
        p for p in listing_folder.iterdir() if p.suffix.lower() in IMAGE_MEDIA_TYPES
    )[:MAX_IMAGES_PER_CALL]

    content = []
    for img_path in images:
        media_type = IMAGE_MEDIA_TYPES[img_path.suffix.lower()]
        b64 = base64.b64encode(img_path.read_bytes()).decode()
        content.append(
            {
                "type": "image",
                "source": {"type": "base64", "media_type": media_type, "data": b64},
            }
        )

    notes_file = listing_folder / "notes.txt"
    notes = notes_file.read_text().strip() if notes_file.exists() else "(none provided)"

    text = PROMPT_FILE.read_text().replace("{{listing_name}}", listing_folder.name).replace(
        "{{notes}}", notes
    )
    content.append({"type": "text", "text": text})
    return content


def generate_for_listing(client: anthropic.Anthropic, listing_folder: Path) -> tuple[int, int, float]:
    content = build_content(listing_folder)
    if not any(block["type"] == "image" for block in content):
        print(f"Skipping {listing_folder.name}: no photos found")
        return 0, 0, 0.0

    print(f"Generating content for {listing_folder.name}...")
    response = client.messages.create(
        model=MODEL,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        output_config={
            "effort": "high",
            "format": {"type": "json_schema", "schema": OUTPUT_SCHEMA},
        },
        messages=[{"role": "user", "content": content}],
    )

    text = next(b.text for b in response.content if b.type == "text")
    parsed = json.loads(text)  # guaranteed valid JSON by output_config.format

    OUTPUT_DIR.mkdir(exist_ok=True)
    out_path = OUTPUT_DIR / f"{listing_folder.name}.json"
    out_path.write_text(json.dumps(parsed, indent=2) + "\n")
    print(f"Saved {out_path.relative_to(REPO_ROOT)}")

    input_tokens = response.usage.input_tokens
    output_tokens = response.usage.output_tokens
    cost = (
        input_tokens * INPUT_PRICE_PER_MTOK + output_tokens * OUTPUT_PRICE_PER_MTOK
    ) / 1_000_000
    print(
        f"[usage] {listing_folder.name}: input={input_tokens} tokens, "
        f"output={output_tokens} tokens, est. cost=${cost:.4f}"
    )
    return input_tokens, output_tokens, cost


def main() -> None:
    if not LISTINGS_DIR.is_dir():
        print(f"No listings/ directory at {LISTINGS_DIR}")
        return

    targets = changed_listing_names()
    client = anthropic.Anthropic()

    total_input = total_output = 0
    total_cost = 0.0
    processed = 0

    for listing_folder in sorted(LISTINGS_DIR.iterdir()):
        if not listing_folder.is_dir() or listing_folder.name.startswith("_"):
            continue
        if targets is not None and listing_folder.name not in targets:
            continue
        input_tokens, output_tokens, cost = generate_for_listing(client, listing_folder)
        total_input += input_tokens
        total_output += output_tokens
        total_cost += cost
        processed += 1

    if processed:
        print(
            f"[usage] run total: {processed} listing(s), input={total_input} tokens, "
            f"output={total_output} tokens, est. cost=${total_cost:.4f}"
        )


if __name__ == "__main__":
    main()
