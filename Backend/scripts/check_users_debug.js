import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log("DB Config:", {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    db: process.env.DB_NAME
});

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function checkUsers() {
    try {
        console.log("Checking DB Connection...");
        const [rows] = await pool.query("SELECT * FROM users");
        console.log(`User Count: ${rows.length}`);
        console.log("Users:", rows);
        process.exit(0);
    } catch (error) {
        console.error("DB Error:", error);
        process.exit(1);
    }
}

checkUsers();
