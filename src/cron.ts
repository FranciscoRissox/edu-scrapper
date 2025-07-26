import nodeCron from 'node-cron';
import { doScrap } from "./scrap.ts";
import fs from 'fs';

const loadJson = () => {
    return JSON.parse(fs.readFileSync('datasources.json', 'utf-8'));
}

export const Scraper = async () => {
    const datasources = loadJson();
    const sources = Object.keys(datasources);
    for(const source of sources){
        try {
            await doScrap(datasources[source], source);
        } catch (error) {
            console.error(`Error when scrapping ${source}`, error);
        }
    }
}

export const initCron = () => {
    nodeCron.schedule('*/30 * * * *', async () => {
        console.log('---Running cron job---');
        await Scraper();
        console.log('---Cron job finished---');
    });
    Scraper();
}


