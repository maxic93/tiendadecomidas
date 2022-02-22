const cheerio = require("cheerio")
const request = require("request-promise")
const fs = require("fs-extra")
const writeStream = fs.createWriteStream("tiendadecomidas.csv")

async function init() {
    const $ = await request({
        uri: "https://www.tiendadealimentos.com.ar/",
        transform: body => cheerio.load(body)
    })
    writeStream.write("index | title | price\n")
    $(".content-product ").each((i, el)=>{
        const title = $(el).find(".product-title a").text()
        const price = $(el).find(".woocommerce-Price-amount bdi").text()
        writeStream.write(`${i} | ${title} | ${price}\n`)
    })
}
init()