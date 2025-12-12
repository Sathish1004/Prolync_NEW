
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'lmsdb'
};

async function checkData() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log("Connected to DB.");

        const [users] = await connection.query("SELECT * FROM users");
        console.log(`Users Count: ${users.length}`);
        console.log("Users Data:", users);

        const [admins] = await connection.query("SELECT * FROM admin");
        console.log(`Admins Count: ${admins.length}`);
        console.log("Admins Data:", admins);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (connection) await connection.end();
    }
}

checkData();
