import { pool } from '../config/db.js';
import bcrypt from 'bcryptjs';

const createLecturer = async () => {
    try {
        const email = 'lecture@prolync.in';
        const rawPassword = 'LP@22';
        const fullName = 'Prolync Lecturer';
        const expertise = 'Computer Science';

        // 1. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        console.log(`Creating Lecturer: ${email}`);

        // 2. Check if exists
        const [existing] = await pool.execute("SELECT * FROM lecturers WHERE email = ?", [email]);
        if (existing.length > 0) {
            console.log("⚠️ Lecturer already exists. Updating password...");
            await pool.execute("UPDATE lecturers SET password = ? WHERE email = ?", [hashedPassword, email]);
            console.log("✅ Password Updated Successfully.");
        } else {
            // 3. Insert
            await pool.execute(
                "INSERT INTO lecturers (full_name, email, password, expertise) VALUES (?, ?, ?, ?)",
                [fullName, email, hashedPassword, expertise]
            );
            console.log("✅ Lecturer Account Created Successfully.");
        }

        process.exit();
    } catch (error) {
        console.error("❌ Error creating lecturer:", error);
        process.exit(1);
    }
};

createLecturer();
