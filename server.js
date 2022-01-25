const express = require('express')
const axios = require('axios')
const app = express()
const fs = require('fs')


app.set('view engine', 'ejs')


app.get('/', (req, res) => {

    let jso = {}
    try {
        jso = JSON.parse(fs.readFileSync('jso.json', 'utf8'))
        console.log(jso)
      } catch (err) {
        console.error(err)
      }
    const rand1 = Math.floor((Math.random() * Object.keys(jso).length));
    const x = Object.keys(jso)[rand1]

    const rand2 = Math.floor((Math.random() * Object.keys(jso[x][0]).length) + 1);
    const y = Object.values(jso[x][0])[rand2]
    axios.get(`https://public.trendyol.com/discovery-web-searchgw-service/v2/api/infinite-scroll/c${y}?pi=${Math.floor((Math.random() * 208))}`)
    .then(response => {
            const jso = JSON.parse(JSON.stringify(response.data))
            if (jso.result.products.length > 0) {
            const rand1 = Math.floor(Math.random() * jso.result.products.length)
            const prod = jso.result.products[rand1]
            res.render("index", {name: prod.name, price: prod.price.discountedPrice, url: `https://trendyol.com${prod.url}`, img : `https://cdn.dsmcdn.com/${prod.images[0]}`})
        }
        else {
            res.render("refresh")
        }
    })
    .catch(error => console.error(error));
})


app.listen(3000)