const express = require("express");
var cors = require("cors");
const axios = require("axios");
const app = express();
const fs = require("fs");

app.set("view engine", "ejs");
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/app.js", (req, res) => {
  res.sendFile(__dirname + "/views/app.js");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/views/style.css");
});

app.get("/categories.json", (req, res) => {
  res.sendFile(__dirname + "/bigCategories.json");
});

app.get("/category/:id", (req, res) => {
  let id = req.params.id - 1;
  let jso = JSON.parse(fs.readFileSync("allCategories.json", "utf8"));
  // randomizers
  if (id < 0) id = Math.floor(Math.random() * Object.keys(jso).length);
  const x = Object.keys(jso)[id];
  let rand2 = Math.floor(Math.random() * Object.keys(jso[x][0]).length + 1);
  let y = Object.values(jso[x][0])[rand2];
  let rand = Math.floor(Math.random() * 208) + 1; // 208 inclusive 0 non-inclusive

  axios
    .get(
      `https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/c${y}?pi=${rand}`
    )
    .then((response) => {
      const jso1 = JSON.parse(JSON.stringify(response.data));
      console.log(`First Length: ${jso1.result.products.length}`);

      if (jso1.result.products.length === 0) {
        const maxPage = Math.ceil(jso1.result.totalCount / 24); // we divide the total product count to products per page and get a random number under that number
        rand = Math.floor(Math.random() * maxPage) + 1;
        axios
          .get(
            `https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/c${y}?pi=${rand}`
          )
          .then((response2) => {
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

function respondToCall(jso, res) {
  const rand1 = Math.floor(Math.random() * jso.result.products.length);
  const prod = jso.result.products[rand1];
  console.log(`URL: ${prod.url}`);
  let response = {
    name: prod.imageAlt,
    price: prod.price.discountedPrice,
    url: `https://trendyol.com${prod.url}`,
    img: `https://cdn.dsmcdn.com/${prod.images[0]}`,
  };
  try {
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({});
  }
}

app.listen(3000);
