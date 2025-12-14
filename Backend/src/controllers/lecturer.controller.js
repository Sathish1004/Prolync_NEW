import { pool as db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Video from '../models/Video.js';
import Quiz from '../models/Quiz.js';

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

// --- Upload Content ---
export const uploadContent = async (req, res) => {
    try {
        const lecturerId = req.user.id;
        const { courseId, title, description } = req.body;

        // Multer puts files in req.files due to .fields()
        if (!req.files || !req.files.video) {
            return res.status(400).json({ message: "Video file is required" });
        }

        const videoPath = req.files.video[0].path;
        const notesPath = req.files.notes ? req.files.notes[0].path : null;

        await Video.create({
            courseId,
            title,
            description,
            videoPath,
            notesPath,
            lecturerId
        });

        res.status(201).json({ message: "Content uploaded successfully and sent for admin approval" });

    } catch (error) {
        console.error("Upload Content Error:", error);
        res.status(500).json({ message: "Upload failed. Please try again" });
    }
};

// --- Create Quiz ---
export const createQuiz = async (req, res) => {
    try {
        const lecturerId = req.user.id;
        const { courseId, question, options, correctAnswer } = req.body;

        if (!courseId || !question || !options || !correctAnswer) {
            return res.status(400).json({ message: "All quiz fields are required" });
        }

        // Ensure options is an array
        const opts = Array.isArray(options) ? options : JSON.parse(options);

        await Quiz.create({
            courseId,
            question,
            options: opts,
            correctAnswer,
            lecturerId
        });

        res.status(201).json({ message: "Quiz created successfully" });

    } catch (error) {
        console.error("Create Quiz Error:", error);
        res.status(500).json({ message: "Failed to create quiz" });
    }
};

// --- Get Content Status ---
export const getContentStatus = async (req, res) => {
    try {
        const lecturerId = req.user.id;
        const videos = await Video.findAllByLecturer(lecturerId);
        res.json(videos);
    } catch (error) {
        console.error("Get Status Error:", error);
        res.status(500).json({ message: "Failed to fetch status" });
    }
};

// --- Dashboard Stats ---
export const getDashboardStats = async (req, res) => {
    try {
        const lecturerId = req.user.id;

        // Mock stats or quick queries
        const [courseRows] = await db.query("SELECT COUNT(*) as count FROM courses WHERE instructor_id = ?", [lecturerId]);
        const [videoRows] = await db.query("SELECT COUNT(*) as count FROM videos WHERE lecturer_id = ?", [lecturerId]);

        res.json({
            activeCourses: courseRows[0].count,
            totalContent: videoRows[0].count,
            totalStudents: 0, // Placeholder
            earnings: 0 // Placeholder
        });

    } catch (error) {
        console.error("Get Stats Error:", error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};
