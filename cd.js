const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

const url = "https://www.amazon.fr/Mario-Party-Superstars-Nintendo-Switch/dp/B097F5D8Y1/?_encoding=UTF8&pd_rd_w=kyfk3&pf_rd_p=1a998406-7f30-4647-8dda-107dde9197e8&pf_rd_r=CE5P96AZ5NGFADQQJ4J9&pd_rd_r=215877a8-21ef-4976-87d9-422c375dc78c&pd_rd_wg=fpvqV&ref_=pd_gw_crs_zg_bs_530490";

// ouverture d'un navigateur à la page de l'url
(async () => {
    const browser = await puppeteer.launch({headless: false}); // if false le browser s'ouvre 

    //const context = await browser.createIncognitoBrowserContext(); nav privé

    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"});
    
    await page.setViewport({
        width:1200,
        height:1000,
    });

    // faire un PDF
    /*await page.pdf({
        path:"page.pdf",
        format:"A4",
    });*/

    // screenshot
    /*await page.screenshot({
        path: "image.png"
    });*/

    // code du Body
    /*let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log(bodyHTML);*/

    let title = await page.evaluate(() => {
        return document.getElementById('productTitle').innerText;
    });

    // Prix du produit
    let price = await page.evaluate(() => {
        return document.getElementById('priceblock_ourprice').innerText;
    });
    //let newData = await data.substring(0, 4);
    console.log(title + " coûte : " + price);

    // si le prix est < à 2400 euros
    if (parseInt(price) < 50) {
        sendNotification(title, price);
    }
    
    async function sendNotification(title, price) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alexis.flacher38@gmail.com",
          pass: process.env.MAIL_PASS,
        },
      });

      let info = await transporter
        .sendMail({
          from: '"PC Cdiscount" <alexis.flacher38@gmail.com>',
          to: "alexis.flacher38@gmail.com",
          subject: title,
          html: "Le prix est de " + price,
        })
        .then(() => console.log("Message envoyé"));
    }

    await browser.close();
})();