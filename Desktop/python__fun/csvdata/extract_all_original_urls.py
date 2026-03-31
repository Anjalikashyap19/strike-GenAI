import re
import csv

input_file = "valid-locations.cache.php"
output_file = "original_urls.csv"

# Read the PHP file
with open(input_file, "r", encoding="utf-8") as f:
    content = f.read()

# Extract original_url values
urls = re.findall(r"'original_url'\s*=>\s*'([^']+)'", content)

cleaned_urls = []

for url in urls:
    # Replace spaces with "-"
    clean_url = url.replace(" ", "-")
    cleaned_urls.append(clean_url)

# Write to CSV
with open(output_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["original_url"])
    for url in cleaned_urls:
        writer.writerow([url])

print(f"{len(cleaned_urls)} URLs extracted and saved to {output_file}")
