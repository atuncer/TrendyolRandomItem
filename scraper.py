from bs4 import BeautifulSoup
import json
import requests


def getSite(url):
    headers = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'}
    result = requests.get(url, headers=headers)
    return result

def getLinks(html):
    dic = {}

    soup = BeautifulSoup(html, "html.parser")
    for tablink in soup.find_all("li", {"class": "tab-link"}):
        dic[tablink.find("a").text] = [{}]
        for ul in tablink.find_all("ul"):
            for li in ul.find_all("li"):
                dic[tablink.find("a").text][0][li.find("a").text] = li.find("a")["href"]

    json_object = json.dumps(dic, indent=2, ensure_ascii=False)


    with open("allCategories.json", "w", encoding="utf-8") as outfile:
        outfile.write(json_object)

    with open("bigCategories.json", "w", encoding="utf-8") as outfile:
        text = "["
        for key in dic:
            text += "\n\t\"" + key + "\","
        text = text[:-1] + "\n]"
        outfile.write(text)
    

if __name__ == "__main__":
    URL = "https://trendyol.com/"
    html = getSite(URL).text
    getLinks(html)
