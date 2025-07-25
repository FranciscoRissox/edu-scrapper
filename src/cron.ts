import nodeCron from 'node-cron';
import Tecnoinf from "./sources/tecnoinf.ts";


export const Scraper = async () => {

    try {
        await Tecnoinf();
    } catch (error) {
        console.error('Error when scrapping tecnoinf', error);
    }
    
}

// Run every 30min
nodeCron.schedule('*/30 * * * *', async () => {
    console.log('---Running cron job---');
    await Scraper();
    console.log('---Cron job finished---');
});


