import pandas as pd
import re

input_excel = r"C:\Users\anjal\Downloads\allcity.xlsx"
output_php = "cities.php"

BASE_URL = "indiaadvocacy.in/service/pvtltd/"


def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"[^a-z0-9\-]", "", text)
    return text


# Read Excel
df = pd.read_excel(input_excel)

if "town" not in df.columns:
    raise Exception("Column 'town' not found in Excel file")

# Remove empty values
towns = df["town"].dropna()

seen = set()
unique_rows = []

for town in towns:
    city = str(town).strip().lower()
    slug = slugify(city)

    if slug not in seen:
        seen.add(slug)
        unique_rows.append((city, slug))

with open(output_php, "w", encoding="utf-8") as f:

    f.write("<?php\n\nreturn [\n")

    for city, slug in unique_rows:
        url = f"{BASE_URL}{slug}/"

        f.write(f"    '{url}' => [\n")
        f.write(f"        'city' => '{city}',\n")
        f.write(f"        'original_url' => '{url}',\n")
        f.write("    ],\n")

    f.write("];\n")

print(f"Generated {len(unique_rows)} unique cities.")
