import { Database } from './db.ts';
import { Scraper } from './cron.ts';

console.log('Server started')
Database.initDb();
Scraper();
Database.closeDb();
