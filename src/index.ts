import { initCron } from './cron.ts';
import { Database } from './db.ts';
Database.initDb();
initCron();
console.log('Server started')

