import Tecnoinf from "./sources/tecnoinf.ts";
import { Database } from './db.ts';

Database.initDb();
Tecnoinf();
Database.closeDb();
