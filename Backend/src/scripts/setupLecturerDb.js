import { pool } from '../config/db.js';

const setupLecturerTables = async () => {
    try {
        console.log("Setting up Lecturer Tables...");

        // Videos Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS videos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                course_id INT,
                lecturer_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                video_path VARCHAR(255),
                notes_path VARCHAR(255),
                status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Videos Table Checked/Created");

        // Quizzes Table
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS quizzes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                course_id INT,
                lecturer_id INT,
                question TEXT NOT NULL,
                options JSON NOT NULL,
                correct_answer VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("✅ Quizzes Table Checked/Created");

        console.log("Database Setup Complete!");
        process.exit();

    } catch (error) {
        console.error("Setup Failed:", error);
        process.exit(1);
    }
};

setupLecturerTables();
