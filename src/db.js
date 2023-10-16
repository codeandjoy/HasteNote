import Dexie from "dexie";

export const db = new Dexie('HasteNote');

db.version(1).stores({
    boards: '&id, name, notes',
    // notes: '&id, type, title, tags, content'
}); 