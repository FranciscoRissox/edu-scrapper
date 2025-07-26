import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./db.sqlite');

export type Data = {
    id: number;
    description: string;
    type: string;
    date: string;
}

const openIfNotOpen = () => {
    if (!db.isOpen) {
        db.open();
    }
}

export const Database = {
    initDb: () => {
        db.exec('create table if not exists data (id integer primary key autoincrement, description text, type text, date text)');
    },
    closeDb: () => {
        db.close();
    },
    readLastData: (type: string): Data | undefined => {
        openIfNotOpen();
        const result = db.prepare(`select * from data where type = '${type}' order by date desc limit 1`).get() as Data | undefined;
        db.close();
        return result;
    },
    insertData: (description: string, type: string) => {
        openIfNotOpen();
        db.prepare(`insert into data (description, type, date) values (?, ?, ?)`).run(description, type, new Date().toISOString());
        db.close();
    }
}

