import mysql from "mysql2/promise";
import "dotenv/config";

const debugDb = async () => {
    console.log("Debugging Database Connection...");
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`DB Name: ${process.env.DB_NAME}`);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log("✅ Connection Successful!");

        const [rows] = await connection.query("DESCRIBE users;");
        console.log("✅ 'users' table schema:");
        console.table(rows);

        await connection.end();
    } catch (error) {
        console.error("❌ Database Error:", error.message);
    }
};

debugDb();
