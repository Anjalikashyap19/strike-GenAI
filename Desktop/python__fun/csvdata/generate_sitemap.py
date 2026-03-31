import re
from datetime import date

input_file = "cities.php"
output_file = "allcitysite.xml"

today = date.today().isoformat()

urls = set()  # removes duplicates automatically


def slugify(text):
    text = text.strip().lower()
    text = re.sub(r"\s+", "-", text)  # spaces → hyphen
    return text


# read php file
with open(input_file, "r", encoding="utf-8") as f:
    content = f.read()


# extract URLs
matches = re.findall(r"'original_url'\s*=>\s*'([^']+)'", content)


for url in matches:

    if not url.startswith("http"):
        url = "https://" + url

    parts = url.strip("/").split("/")

    # remove pincode only if last part is numeric
    if parts[-1].isdigit():
        parts = parts[:-1]

    # slugify city/state parts
    for i in range(len(parts)):
        parts[i] = slugify(parts[i])

    clean_url = "/".join(parts) + "/"

    urls.add(clean_url)


# write sitemap
with open(output_file, "w", encoding="utf-8") as f:

    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    for url in sorted(urls):

        f.write("  <url>\n")
        f.write(f"    <loc>{url}</loc>\n")
        f.write(f"    <lastmod>{today}</lastmod>\n")
        f.write("    <changefreq>weekly</changefreq>\n")
        f.write("    <priority>0.8</priority>\n")
        f.write("  </url>\n")

    f.write("</urlset>\n")


print("Sitemap generated:", output_file)
print("Total URLs:", len(urls))
