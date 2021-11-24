const puppeteer = require("puppeteer");
require("dotenv").config();

const url = "https://instagram.com";

// ouverture d'un navigateur à la page de l'url
(async () => {
    const browser = await puppeteer.launch({headless: false}); // if false le browser s'ouvre 
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: "networkidle2"});
    
    // clique sur le btn des cookies
    await page.click('.bIiDR');
    
    // login
    await page.waitForSelector('[name=username]'), {visible: true};
    await page.type('[name=username]', "alexis.flacher38@gmail.com", {delay: 150});

    // password
    await page.type('[name=password]', process.env.INSTA_PASS, {delay: 150});

    // BTN connexion
    await page.click('button[type=submit]');

    // BTN identifiant
    await page.waitForSelector('.cmbtv > button'), {visible: true};
    await page.click(".cmbtv > button");

    // BTN notif
    await page.waitForSelector('.mt3GC > button'), {visible: true};
    await page.click(".mt3GC > button");
    
    //await browser.close();
})();