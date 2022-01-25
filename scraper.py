from operator import le
from random import getrandbits
from bs4 import BeautifulSoup
import json


def getLinks():
    dic = {}

    with open("ulli.html") as html:
        soup = BeautifulSoup(html, "html.parser")
        for tablink in soup.find_all("li", {"class": "tab-link"}):
            dic[tablink.find("a").text] = [{}]
            for ul in tablink.find_all("ul"):
                li: BeautifulSoup
                for li in ul.find_all("li"):
                    dic[tablink.find("a").text][0][li.find(
                        "a").text] = li.find("a")["href"]

    json_object = json.dumps(dic, indent=2, ensure_ascii=False)

    # save this json object to a file
    with open("ulli.json", "w") as outfile:
        outfile.write(json_object)

if __name__ == "__main__":
    getLinks()
