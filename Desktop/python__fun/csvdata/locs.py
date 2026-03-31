import csv
import re
from pathlib import Path

# ────────────────────────────────────────────────
# Configuration
# ────────────────────────────────────────────────
INPUT_FILE = "pinlocs.csv"
OUTPUT_FILE = "pin_locations_output.php"

# Assumed CSV columns: pin, state, locs
# locs example: "[28.612912_77.231489, 28.704059_77.102490, 28.535516_77.391026]"


def clean_locs_string(s: str) -> list[str]:
    s = s.strip()
    if not s or s == "[]":
        return []
    # Remove brackets and split
    s = s.strip("[]")
    items = [x.strip() for x in s.split(",") if x.strip()]
    return items


def parse_coord(coord_str: str) -> tuple[float | None, float | None]:
    try:
        lat_str, lng_str = coord_str.split("_")
        return float(lat_str), float(lng_str)
    except:
        return None, None


def slugify(text: str) -> str:
    if not text:
        return ""
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text


print("Reading:", INPUT_FILE)

entries = []

with open(INPUT_FILE, encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        pin = row.get("pin", "").strip()
        state = row.get("state", "").strip().lower()
        locs_raw = row.get("locs", "").strip()

        if not pin or not state:
            continue

        coord_items = clean_locs_string(locs_raw)

        lats = []
        lngs = []

        for coord_str in coord_items:
            lat, lng = parse_coord(coord_str)
            if lat is not None and lng is not None:
                lats.append(lat)
                lngs.append(lng)
            else:
                print(f"  Skipping invalid coord: {coord_str!r}  (pin={pin})")

        if not lats:  # no valid coordinates
            print(f"  Skipping pin {pin} — no valid coordinates")
            continue

        # Use only pin in URL (one URL per pincode)
        path = f"{state}/{pin}/"
        url = f"indiaadvocacy.in/service/aoa/{path}"

        entry = {
            "url_key": url,
            "lats": lats,
            "lngs": lngs,
            "state": state,
            "pin": pin,
            "original_url": url,
        }

        entries.append(entry)

# ────────────────────────────────────────────────
# Generate PHP output
# ────────────────────────────────────────────────

lines = ["return ["]

for entry in entries:
    key = entry["url_key"]
    lines.append(f"    '{key}' => [")

    # Arrays of coordinates
    lats_str = ", ".join(f"{x:.6f}" for x in entry["lats"])
    lngs_str = ", ".join(f"{x:.6f}" for x in entry["lngs"])

    lines.append("        'lats' => [" + lats_str + "],")
    lines.append("        'lngs' => [" + lngs_str + "],")

    lines.append(f"        'state' => '{entry['state']}',")
    lines.append(f"        'pin'   => '{entry['pin']}',")
    lines.append(f"        'original_url' => '{entry['original_url']}',")

    lines.append("    ],")
    lines.append("")

lines.append("];")

php_content = "\n".join(lines)

Path(OUTPUT_FILE).write_text(php_content, encoding="utf-8")

print(f"\nDone. Wrote {len(entries)} pincode entries to → {OUTPUT_FILE}")
print("Example keys:")
for e in entries[:5]:
    print(f"  {e['url_key']}  →  {len(e['lats'])} locations")
