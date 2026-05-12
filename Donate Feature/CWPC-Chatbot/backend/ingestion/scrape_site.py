import requests
from bs4 import BeautifulSoup

URL = "https://preventwildfire.world/"

response = requests.get(URL)

print("Status Code:", response.status_code)

soup = BeautifulSoup(response.text, "html.parser")

# Remove unnecessary tags
for tag in soup(["script", "style", "nav", "footer"]):
    tag.decompose()

text = soup.get_text(separator="\n")

cleaned = "\n".join(
    line.strip()
    for line in text.splitlines()
    if line.strip()
)

with open("backend/data/cwpc_website.txt", "w") as f:
    f.write(cleaned)

print("Website content saved successfully.")