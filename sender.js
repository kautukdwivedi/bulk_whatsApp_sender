#!/usr/bin/env node
const puppeteer = require("puppeteer");

let cmd = process.argv[2];
if (cmd == "-help") showhelp();
let args = process.argv.slice(3);
let idx = 0;
let message = "";
let contacts = [];
for (; args[idx] != "-c"; idx++) {
  message = message + " " + args[idx];
}
idx++;
for (; idx < args.length; idx++) {
  contacts.push(args[idx]);
}

(async function () {
  if (cmd == "-help") await showhelp();
  let browser = await puppeteer.launch({
    executablePath: "/usr/bin/brave-browser",
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  let pages = await browser.pages();
  let tab = pages[0];
  if (cmd === "-m") await sendMessage(tab, message);
  else if (cmd === "-g") await sendGif(tab, message);
  else if (cmd === "-r") await sendReaction(tab, message);
  else if (cmd === "-w") await sendGreetings(tab, message, browser);
  else if (cmd === "-n") await createGroup(tab, message);
  else await showhelp();
  process.exit(1);
})();

async function sendMessage(tab, message) {
  await tab.goto("https://web.whatsapp.com/");
  for (let i = 0; i < contacts.length; i++) {
    await tab.waitForSelector('[data-tab ="3"]');
    await tab.type('[data-tab ="3"]', contacts[i]);
    await tab.keyboard.press("Enter");
    await tab.waitForSelector('[data-tab ="6"]');
    await tab.type('[data-tab ="6"]', message);
    await tab.keyboard.press("Enter");
  }
}

async function sendGreetings(tab, greeting, browser) {
  await tab.goto("https://createcustomwishes.com/");
  await tab.waitForSelector(".fa.fa-search");
  await tab.click(".fa.fa-search");
  await tab.waitForSelector(".search-field");
  await tab.type(".search-field", greeting);
  await tab.waitForSelector('[value="Search"]');
  await tab.click('[value="Search"]');
  await tab.waitForNavigation({ waitUntil: "networkidle2" });
  await tab.waitForSelector(".entry-summary p");
  let greetContent = await tab.evaluate(function () {
    return document.querySelector(".entry-summary p").textContent;
  });
  let newTab = await browser.newPage();
  await sendMessage(newTab, greetContent);
}

async function sendGif(tab, topic) {
  await tab.goto("https://web.whatsapp.com/");
  for (let i = 0; i < contacts.length; i++) {
    await tab.waitForSelector('[data-tab ="3"]');
    await tab.type('[data-tab ="3"]', contacts[i]);
    await tab.keyboard.press("Enter");
    await tab.waitForSelector('[data-icon="smiley"]');
    await tab.click('[data-icon="smiley"]', "right");
    await tab.waitForSelector('[data-icon="gif"]');
    await tab.click('[data-icon="gif"]', "right");
    await tab.waitForSelector("._5o68e.copyable-text.selectable-text");
    await tab.type("._5o68e.copyable-text.selectable-text", topic);
    await tab.keyboard.press("Enter");
    await tab.waitForTimeout(1000);
    await tab.waitForSelector("._1qWwG");
    await tab.click("._1qWwG", "right");
    await tab.waitForSelector(".SncVf._3doiV");
    await tab.click(".SncVf._3doiV", "right");
    await tab.waitForTimeout(1000);
  }
}

async function sendReaction(tab, reaction) {
  await tab.goto("https://web.whatsapp.com/");
  for (let i = 0; i < contacts.length; i++) {
    await tab.waitForSelector('[data-tab ="3"]');
    await tab.type('[data-tab ="3"]', contacts[i]);
    await tab.keyboard.press("Enter");
    await tab.waitForSelector('[data-icon="smiley"]');
    await tab.click('[data-icon="smiley"]', "right");
    await tab.waitForSelector("._5o68e.copyable-text.selectable-text");
    await tab.type("._5o68e.copyable-text.selectable-text", reaction);
    await tab.waitForSelector("._2hI6B");
    await tab.waitForSelector("._2hI6B>span");
    let emojis = await tab.$$("._2hI6B>span");
    let count = 0;
    for (
      let i = 1;
      i <= emojis.length && i <= 15;
      i = i + Math.floor(Math.random() * 10)
    ) {
      let emoji = '[data-emoji-index="' + i + '"]'; //[data-emoji-index="0"]
      await tab.click(emoji);
      count++;
      if (count > 2) break;
    }
    await tab.keyboard.press("Enter");
  }
}

async function createGroup(tab, name) {
  await tab.goto("https://web.whatsapp.com/");
  await tab.waitForSelector('[aria-label="Menu"]');
  await tab.click('[aria-label="Menu"]', "left");
  await tab.waitForSelector('[aria-label="New group"]');
  await tab.click('[aria-label="New group"]');
  await tab.waitForSelector("._38sK8.copyable-text.selectable-text");
  for (let i = 0; i < contacts.length; i++) {
    await tab.type("._38sK8.copyable-text.selectable-text", contacts[i]);
    await tab.keyboard.press("Enter");
    await tab.waitForTimeout(1000);
  }
  await tab.keyboard.press("Enter");
  await tab.waitForTimeout(1000);
  await tab.waitForSelector('[data-tab="6"]');
  await tab.type('[data-tab ="6"]', name);
  await tab.keyboard.press("Enter");
  await tab.waitForSelector("._3xWLK");
  await tab.click("._3xWLK");
  await tab.waitForSelector(".SncVf._3doiV");
  await tab.click(".SncVf._3doiV");
}

async function showhelp() {
  console.log(
    "Format                :- w-app -cmd [Message] -c [Contact list must be seperated by space]"
  );
  console.log("-m [Message]          :- To send message to given contacts");
  console.log("-g [Topic]            :- To send gif to given contacts");
  console.log(
    "-r [Emoji]            :- To give reactions using emoji to given contacts"
  );
  console.log(
    "-w [Ocassion]         :- To send greeting wishes to given contacts"
  );
  console.log("-n [Name]             :- To make new group for given contacts");
  console.log("-help                 :- show help");
  process.exit(1);
}
