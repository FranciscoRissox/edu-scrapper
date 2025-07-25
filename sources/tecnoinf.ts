import playwright from 'playwright';

export default async () => {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.fing.edu.uy/tecnoinf/mvd/novedades.html');
    const main = await page.locator('body > div.main').locator("[class='description']").nth(0).innerHTML()
    console.log(main);
    await browser.close();
}