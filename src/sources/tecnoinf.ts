import { chromium } from '@playwright/test';
import { Database } from '../db.ts';
import { Tg } from '../tg.ts';

const TYPE = 'TECNOINF';

export default async () => {
    console.log(`   -> Running ${TYPE}`)
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.fing.edu.uy/tecnoinf/mvd/novedades.html');
    const main = await page.locator('body > div.main').locator("[class='description']").nth(0).innerHTML()
    const lastData = Database.readLastData(TYPE);
    if (lastData?.description !== main) {
        Database.insertData(main, TYPE);
        Tg.sendMessage(TYPE, main);
    }
    console.log(`   -> ${TYPE} finished`)
    await browser.close();
}