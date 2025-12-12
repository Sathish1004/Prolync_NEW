import { pool as db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- Lecturer Register ---
export const registerLecturer = async (req, res) => {
    try {
        const { full_name, email, password, expertise } = req.body;

        // Basic Validation
        if (!full_name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check exists
        const [existing] = await db.query("SELECT * FROM lecturers WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "Lecturer email already exists" });
        }

        // Hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert
        await db.query("INSERT INTO lecturers (full_name, email, password, expertise) VALUES (?, ?, ?, ?)",
            [full_name, email, hashedPassword, expertise || 'General']);

        res.status(201).json({ message: "Lecturer Registered Successfully" });

    } catch (error) {
        console.error("Lecturer Register Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Lecturer Login ---
export const loginLecturer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await db.query("SELECT * FROM lecturers WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Lecturer not found" });
        }

        const lecturer = rows[0];
        const isMatch = await bcrypt.compare(password, lecturer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: lecturer.id, email: lecturer.email, role: 'lecturer' },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '7d' }
        );

        res.json({
            message: "Lecturer Login Success",
            token,
            user: { id: lecturer.id, full_name: lecturer.full_name, email: lecturer.email, role: 'lecturer' }
        });

    } catch (error) {
        console.error("Lecturer Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Create Course ---
export const createCourse = async (req, res) => {
    try {
        // ID comes from the token via auth middleware
        const instructor_id = req.user.id;
        const { title, description, price } = req.body;

        if (!title || !price) {
            return res.status(400).json({ message: "Title and Price are required" });
        }

        await db.query("INSERT INTO courses (title, description, price, instructor_id) VALUES (?, ?, ?, ?)",
            [title, description, price, instructor_id]);

        res.status(201).json({ message: "Course Created Successfully" });

    } catch (error) {
        console.error("Create Course Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Get My Students (Placeholder) ---
export const getMyStudents = async (req, res) => {
    // In a real query, we would join enrollments and courses where instructor_id = req.user.id
    res.json({ message: "List of students would appear here" });
};
