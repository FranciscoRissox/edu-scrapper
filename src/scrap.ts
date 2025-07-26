import { chromium } from "@playwright/test";
import { Database } from "./db.ts";
import { Tg } from "./tg.ts";
import fs from 'fs';

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
    const lastData = Database.readLastData(key);
    if (!lastData || lastData?.description !== main) {
        Database.insertData(main, key);
        Tg.sendMessage(key, main);
    }
    console.log(`   -> ${ds.name} finished`)
    await browser.close();
}
