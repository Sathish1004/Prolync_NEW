import { pool as db } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- Admin Login ---
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const admin = rows[0];
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: admin.id, email: admin.email, role: 'admin' },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '1d' }
        );

        res.json({
            message: "Admin Login Success",
            token,
            user: { id: admin.id, full_name: admin.full_name, email: admin.email, role: 'admin' }
        });

    } catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// --- Admin Dashboard Stats ---
export const getAdminStats = async (req, res) => {
    try {
        const [users] = await db.query("SELECT COUNT(*) as count FROM users");
        const [lecturers] = await db.query("SELECT COUNT(*) as count FROM lecturers");
        const [courses] = await db.query("SELECT COUNT(*) as count FROM courses");
        const [payments] = await db.query("SELECT COUNT(*) as count FROM payments"); // Placeholder for now

        res.json({
            totalUsers: users[0].count,
            totalLecturers: lecturers[0].count,
            totalCourses: courses[0].count,
            totalPayments: payments[0].count
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
};

// --- Get All Users ---
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, full_name, email, phone, status, created_at FROM users");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// --- Get All Lecturers ---
export const getAllLecturers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, full_name, email, expertise, created_at FROM lecturers");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching lecturers" });
    }
};

// --- Delete User ---
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

// --- Update User Status (Block/Active) ---
export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'active' or 'blocked'
        await db.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
        res.json({ message: `User status updated to ${status}` });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ message: "Error updating status" });
    }
};
