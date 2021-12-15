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

    // Répertoire des messages
    await page.click("a.xWeGp svg._8-yf5");

    // popup notif
    await page.waitForSelector('.mt3GC > button'), {visible: true};
    await page.click(".mt3GC > button");

    // 
    await page.waitForSelector('img[alt="Photo de profil de ..."]'), {visible: true};
    await page.click('img[alt="Photo de profil de ..."]');
    

    await page.waitForSelector('.mt3GC > button'), {visible: true};
    await page.click(".mt3GC > button");

    await page.waitForSelector('textarea[placeholder="Votre message…"]'), {visible: true};
    await page.click('textarea[placeholder="Votre message…"]');
    await page.type('textarea[placeholder="Votre message…"]', "...", {delay: 150});
    await page.click('div.X3a-9 div:nth-child(3) button[type=button]');
    await console.log("Message envoyé !")
    //await browser.close();
})();
