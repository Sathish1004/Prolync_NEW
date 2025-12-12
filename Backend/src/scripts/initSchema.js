import 'dotenv/config';
import { pool } from '../config/db.js';

const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255),
            picture VARCHAR(1024),
            google_id VARCHAR(255) UNIQUE,
            is_verified BOOLEAN DEFAULT FALSE,
            verification_token VARCHAR(255),
            token_expires DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;
    try {
        const connection = await pool.getConnection();
        await connection.query(createTableQuery);
        console.log("Users table created or already exists.");
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error("Error creating users table:", error);
        process.exit(1);
    }
};

createUsersTable();
