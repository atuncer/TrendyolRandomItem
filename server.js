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

app.get('/category/:id', (req, res) => {
  const id = req.params.id;

  let jso = {};
  jso = JSON.parse(fs.readFileSync("allCategories.json", "utf8"));
  const x = Object.keys(jso)[id];
  let rand2 = 0
  let y = ""
  try {
    rand2 = Math.floor(Math.random() * Object.keys(jso[x][0]).length + 1);
    y = Object.values(jso[x][0])[rand2];
  } catch (error) {
    res.status(404).json({})
    return
  }
  axios
    .get(
      `https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/c${y}?pi=${Math.floor(
        Math.random() * 208 // 208 is the max page number
      )}`
    )
    .then((response) => {
      const jso = JSON.parse(JSON.stringify(response.data));
      if (jso.result.products.length > 0) {
        const rand1 = Math.floor(Math.random() * jso.result.products.length);
        const prod = jso.result.products[rand1];
        res.json({
          name: prod.imageAlt,
          price: prod.price.discountedPrice,
          url: `https://trendyol.com${prod.url}`,
          img: `https://cdn.dsmcdn.com/${prod.images[0]}`,
        });
        return
      } else {
        res.status(404).json({})
        return
      }
    })
    .catch((error) => res.status(404).json({}));
    
});

app.listen(3000);
