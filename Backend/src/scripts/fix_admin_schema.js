
import { pool } from '../config/db.js';

const fixSchema = async () => {
    try {
        console.log("Starting DB Schema Fix...");

        // 1. Fix Users Table (Add google_id)
        try {
            await pool.execute("ALTER TABLE users ADD COLUMN google_id VARCHAR(255) NULL");
            console.log("Added google_id column to users table.");
        } catch (error) {
            if (error.code === 'ER_DUP_FIELDNAME') {
                console.log("google_id column already exists.");
            } else {
                console.error("Error adding google_id:", error.message);
            }
        }

        // 2. Create Videos Table (if not exists)
        const createVideosTable = `
            CREATE TABLE IF NOT EXISTS videos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                course_id INT NULL,
                lecturer_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                video_path VARCHAR(255),
                notes_path VARCHAR(255),
                status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (lecturer_id) REFERENCES lecturers(id) ON DELETE CASCADE
            )
        `;
        await pool.execute(createVideosTable);
        console.log("Verified/Created videos table.");

        // 3. Create Lecturers Table (if not exists - prereq for videos)
        const createLecturersTable = `
            CREATE TABLE IF NOT EXISTS lecturers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                expertise VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        await pool.execute(createLecturersTable);
        console.log("Verified/Created lecturers table.");

        console.log("Schema Fix Complete.");
        process.exit(0);
    } catch (error) {
        console.error("Schema Fix Failed:", error);
        process.exit(1);
    }
};

fixSchema();
