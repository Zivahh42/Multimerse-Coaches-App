import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const file = path.resolve(__dirname, '../db/coaches.json');
const adapter = new JSONFile(file);
export const db = new Low(adapter, { coaches: [] });


export async function initDb() {
await db.read();
db.data ||= { coaches: [] };
await db.write();
}