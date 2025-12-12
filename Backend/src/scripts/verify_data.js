import mysql from "mysql2/promise";
import "dotenv/config";

const verifyData = async () => {
    console.log("--- Verifying Data in Database ---");
    console.log(`Connecting to DB: ${process.env.DB_NAME} at ${process.env.DB_HOST}`);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.query("SELECT id, full_name, email, created_at FROM users");

        console.log(`\nFound ${rows.length} users:`);
        if (rows.length > 0) {
            console.table(rows);
        } else {
            console.log("No users found in the table.");
        }

        await connection.end();
    } catch (error) {
        console.error("❌ DB Verification Error:", error.message);
    }
};

verifyData();
