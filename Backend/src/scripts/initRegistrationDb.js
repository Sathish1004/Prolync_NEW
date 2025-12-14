import mysql from "mysql2/promise";
import "dotenv/config";

const initRegistrationDb = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        console.log("Connected to database. Starting schema updates...");

        // 1. Update users table with explicit error handling for duplicates
        const columnsToAdd = [
            "ADD COLUMN mobile VARCHAR(15)",
            "ADD COLUMN qualification VARCHAR(50)",
            "ADD COLUMN profile VARCHAR(50)",
            "ADD COLUMN graduation_year VARCHAR(10)",
            "ADD COLUMN language VARCHAR(20)"
        ];

        for (const col of columnsToAdd) {
            try {
                // Remove IF NOT EXISTS if it was causing issues, just rely on try/catch
                await connection.query(`ALTER TABLE users ${col}`);
                console.log(`Executed: ALTER TABLE users ${col}`);
            } catch (err) {
                // Error 1060: Duplicate column name
                if (err.errno === 1060) {
                    console.log(`Column already exists (skipping): ${col}`);
                } else {
                    console.error(`Error adding column: ${col}`, err.message);
                }
            }
        }
        console.log("Updated 'users' table.");

        // 2. Create otp_logs table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS otp_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                mobile VARCHAR(15) NOT NULL,
                otp_code VARCHAR(6) NOT NULL,
                expires_at DATETIME NOT NULL,
                is_used BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Created 'otp_logs' table.");

        // 3. Create orders table (for Payment)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                course_id INT NOT NULL,
                razorpay_order_id VARCHAR(100),
                amount DECIMAL(10, 2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'INR',
                status ENUM('created', 'paid', 'failed') DEFAULT 'created',
                payment_id VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log("Created 'orders' table.");

        // 4. Create enrollments table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS enrollments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                course_id INT NOT NULL,
                access_granted BOOLEAN DEFAULT TRUE,
                enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_enrollment (user_id, course_id)
            )
        `);
        console.log("Created 'enrollments' table.");

        await connection.end();
        console.log("Database schema updated successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error updating database schema:", error);
        process.exit(1);
    }
};

initRegistrationDb();
