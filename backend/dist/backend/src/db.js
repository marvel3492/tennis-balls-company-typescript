import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});
// Create tables
try {
    let sql = readFileSync('tables.sql', 'utf8');
    db.exec(sql);
}
catch (err) {
    console.log(err);
    process.exit(1);
}
export default db;
//# sourceMappingURL=db.js.map