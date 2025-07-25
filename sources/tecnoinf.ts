import { chromium } from '@playwright/test';
import { Database } from '../db.ts';

export default async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.fing.edu.uy/tecnoinf/mvd/novedades.html');
    const main = await page.locator('body > div.main').locator("[class='description']").nth(0).innerHTML()
    const lastData = Database.readLastData('tecnoinf');
    if (lastData?.description !== main) {
        Database.insertData(main, 'tecnoinf');
    }
    await browser.close();
}