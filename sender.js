const puppeteer = require("puppeteer");


(async function () {
  let browser = await puppeteer.launch({
    executablePath:'/usr/bin/brave-browser',
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let tab = pages[0];
  await sendGif(tab,"8448605921","holi")
})();

async function sendMessage (tab,name,message){
  await tab.goto("https://web.whatsapp.com/");
  await tab.waitForSelector('[data-tab ="3"]');
  await tab.type('[data-tab ="3"]', name);
  await tab.keyboard.press('Enter');
  await tab.waitForSelector('[data-tab ="6"]');
  await tab.type('[data-tab ="6"]', message);
  await tab.keyboard.press('Enter');
}

async function sendGreetings (page,name,greeting){
  
}

async function sendGif (tab,name,topic){
  await tab.goto("https://web.whatsapp.com/");
  await tab.waitForSelector('[data-tab ="3"]');
  await tab.type('[data-tab ="3"]', name);
  await tab.keyboard.press('Enter');
  await tab.waitForSelector('[data-icon="smiley"]');
  await tab.click('[data-icon="smiley"]', 'right');
  await tab.waitForSelector('[data-icon="gif"]');
  await tab.click('[data-icon="gif"]', 'right');
  await tab.waitForSelector('._5o68e.copyable-text.selectable-text');
  await tab.type('._5o68e.copyable-text.selectable-text',topic);
  await tab.keyboard.press('Enter');
  await tab.waitForSelector('._1qWwG');
  await tab.click('._1qWwG', 'right');
  await tab.waitForSelector('.SncVf._3doiV');
  await tab.click('.SncVf._3doiV', 'right');
}

async function sendReaction (tab,name,reaction){
  await tab.goto("https://web.whatsapp.com/");
  await tab.waitForSelector('[data-tab ="3"]');
  await tab.type('[data-tab ="3"]', name);
  await tab.keyboard.press('Enter');
  await tab.waitForSelector('[data-icon="smiley"]');
  await tab.click('[data-icon="smiley"]', 'right');
  await tab.waitForSelector('._5o68e.copyable-text.selectable-text');
  await tab.type('._5o68e.copyable-text.selectable-text',reaction);
  await tab.waitForSelector('._2hI6B');
  await tab.waitForSelector('._2hI6B>span');
  let emojis = await tab.$$('._2hI6B>span');
  let count = 0;
  for(let i = 1; i <= emojis.length && i <= 15; i = i + Math.floor(Math.random() * 10)){
    let emoji = '[data-emoji-index="' + i + '"]'; //[data-emoji-index="0"]
    await tab.click(emoji);
    count++;
    if(count > 2)
    break;
  }
  await tab.keyboard.press('Enter');
}
