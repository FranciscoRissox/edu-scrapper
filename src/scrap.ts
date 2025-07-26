import { chromium } from "@playwright/test";
import { Database } from "./db.ts";
import { Tg } from "./tg.ts";
import { extractTextWithLinks } from "./utils.ts";

export type TDataSource = {
    name: string;
    url: string;
    selector: string;
    chatId: string;
}

export const doScrap = async (ds: TDataSource, key: string) => {
    console.log(`   -> Running ${ds.name}`)
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(ds.url);
    const main = await page.locator(ds.selector).nth(0).innerHTML()
    const parsedText =extractTextWithLinks(main);
    const lastData = Database.readLastData(key);
    if (!lastData || lastData?.description !== parsedText) {
        Database.insertData(parsedText, key);
        Tg.sendMessage(ds.chatId, parsedText);
    }
    console.log(`   -> ${ds.name} finished`)
    await browser.close();
}
