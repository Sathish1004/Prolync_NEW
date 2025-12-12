
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'lmsdb'
};

async function setupMultiRoleDb() {
    let connection;
    try {
        console.log("--- Multi-Role LMS Database Setup ---");

        // Connect to MySQL server (without specifying DB first to ensure we can create it if needed, though usually we assume DB exists or we connect to sys)
        // ideally we connect to the DB directly if it exists. 
        console.log(`Connecting to ${dbConfig.database}...`);
        connection = await mysql.createConnection(dbConfig);
        console.log("MySQL Connected.");

        // 1. Create Tables

        // 0. Drop Tables in Order (Child -> Parent)
        console.log("Dropping existing tables to ensure clean schema update...");
        await connection.query("SET FOREIGN_KEY_CHECKS = 0");
        await connection.query("DROP TABLE IF EXISTS payments");
        await connection.query("DROP TABLE IF EXISTS enrollments");
        await connection.query("DROP TABLE IF EXISTS courses");
        await connection.query("DROP TABLE IF EXISTS lecturers");
        await connection.query("DROP TABLE IF EXISTS users");
        await connection.query("DROP TABLE IF EXISTS admin");
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");

        // ADMIN TABLE
        console.log("Re-creating 'admin' table...");
        await connection.query(`
            CREATE TABLE admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // USERS TABLE
        console.log("Re-creating 'users' table...");
        await connection.query(`
            CREATE TABLE users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100),
            email VARCHAR(150) UNIQUE,
            password VARCHAR(255),
            phone VARCHAR(20),
            status ENUM('active', 'blocked') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
            `);

        // LECTURERS TABLE
        console.log("Creating 'lecturers' table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS lecturers(
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255),
                expertise VARCHAR(200),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);

        // COURSES TABLE
        console.log("Creating 'courses' table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS courses(
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(200),
                description TEXT,
                price DECIMAL(10, 2),
                instructor_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(instructor_id) REFERENCES lecturers(id) ON DELETE SET NULL
            )
            `);

        // ENROLLMENTS TABLE
        console.log("Creating 'enrollments' table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS enrollments(
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                course_id INT,
                status ENUM('registered', 'ongoing', 'completed') DEFAULT 'registered',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
            `);

        // PAYMENTS TABLE
        console.log("Creating 'payments' table...");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS payments(
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                course_id INT,
                amount DECIMAL(10, 2),
                status ENUM('success', 'failed', 'pending') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
            )
            `);

        console.log("All tables created successfully.");

        // 2. Insert Default Admin
        const adminEmail = 'Rahul@prolync.in';
        const [rows] = await connection.query('SELECT * FROM admin WHERE email = ?', [adminEmail]);

        if (rows.length === 0) {
            console.log("Inserting default admin...");
            // Generating fresh hash for 'RB@22' to ensure validity
            const hashedPassword = await bcrypt.hash('RB@22', 10);
            await connection.query('INSERT INTO admin (full_name, email, password) VALUES (?, ?, ?)',
                ['Boss', adminEmail, hashedPassword]);
            console.log("Default Admin created: Rahul@prolync.in / RB@22 (New Hash Generated)");
            console.log("Default Admin created: Rahul@prolync.in / RB@22");
        } else {
            console.log("Default Admin already exists.");
        }

    } catch (error) {
        console.error("Setup Failed:", error);
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

setupMultiRoleDb();
