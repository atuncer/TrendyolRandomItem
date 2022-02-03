const express = require("express");
var cors = require("cors");
const axios = require("axios");
const app = express();
const fs = require("fs");
var path = require("path");

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../public/index.html"));
});

app.get("/app.js", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../public/app.js"));
});

app.get("/style.css", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + "/../public/style.css"));
});

app.get("/categories.json", (req, res) => {
  res.status(200).sendFile(__dirname + "/bigCategories.json");
});

app.get("/logo.png", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../public/images/logo.png"));
});

app.get("/blank.png", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../public/images/blank.png"));
});

app.get("/category/:id", (req, res) => {
  let id = req.params.id - 1;
  let jso = JSON.parse(
    fs.readFileSync(__dirname + "allCategories.json", "utf8")
  );
  // randomizers
  if (id < 0) id = Math.floor(Math.random() * Object.keys(jso).length);
  const x = Object.keys(jso)[id];
  let rand2 = Math.floor(Math.random() * Object.keys(jso[x][0]).length);
  let category = Object.values(jso[x][0])[rand2];
  let rand = Math.floor(Math.random() * 208) + 1; // 208 inclusive 0 non-inclusive
  let url = setUrl(category, rand);
  axios
    .get(url)
    .then((response) => {
      console.log(url);
      const jso1 = JSON.parse(JSON.stringify(response.data));
      console.log(`First Length: ${jso1.result.products.length}`);

      if (jso1.result.products.length === 0) {
        const productsPerPage = 24;
        const maxPage = Math.ceil(jso1.result.totalCount / productsPerPage);
        rand = Math.floor(Math.random() * maxPage) + 1;
        let url2 = setUrl(category, rand);
        axios.get(url2).then((response2) => {
          const jso2 = JSON.parse(JSON.stringify(response2.data));
          console.log(`Second Length: ${jso2.result.products.length}`);

          respondToCall(jso2, res);
        });
      } else {
        respondToCall(jso1, res);
      }
      return;
    })
    .catch((error) => res.status(404).json({}));
});

function setUrl(url, rand) {
  if (url.substring(0, 4) != "/sr/")
    return `https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/c${url}?pi=${rand}`;
  return `https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll${url}&pi=${rand}`;
}

function respondToCall(jso, res) {
  const rand1 = Math.floor(Math.random() * jso.result.products.length);
  const prod = jso.result.products[rand1];
  console.log(`URL: ${prod.url}`);
  let rating = prod.hasOwnProperty("ratingScore")
    ? prod.ratingScore.averageRating
    : -1;
  let ratingCount = prod.hasOwnProperty("ratingScore")
    ? prod.ratingScore.totalCount
    : -1;
  let response = {
    name: prod.imageAlt,
    price: prod.price.discountedPrice,
    url: `https://trendyol.com${prod.url}`,
    img: `https://cdn.dsmcdn.com${prod.images[0]}`,
    rating: rating,
    ratingCount: ratingCount,
  };
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({});
  }
}

app.listen(3000);
