import mysql from "mysql2/promise";
import "dotenv/config";

const setupLmsDb = async () => {
    try {
        // Connect to MySQL server (no specific DB yet)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || ''
        });

        // Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS lmsdb;`);
        console.log(`Database 'lmsdb' created or already exists.`);

        // Connect to the new DB
        await connection.end();
        const dbConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASS || '',
            database: 'lmsdb'
        });

        // Create Users Table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await dbConnection.query(createTableQuery);
        console.log("Table 'users' created or already exists in 'lmsdb'.");

        await dbConnection.end();
        process.exit(0);
    } catch (error) {
        console.error("Error setting up LMS DB:", error);
        process.exit(1);
    }
};

setupLmsDb();
