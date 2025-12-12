import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { pool } from '../config/db.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Email Transporter (Configure with Env Vars)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "SECRET_KEY", {
        expiresIn: '7d'
    });
};

// @desc    Register User
// @route   POST /api/v1/auth/register
export const register = asyncHandler(async (req, res) => {
    const { full_name, email, password, confirm_password, phone } = req.body;

    console.log("Register Attempt:", req.body); // Debug log

    // Validation
    if (!full_name || !email || !password || !confirm_password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if email already exists
        const [existingUsers] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert User
        const [result] = await pool.execute(
            "INSERT INTO users (full_name, email, password, phone, status) VALUES (?, ?, ?, ?, ?)",
            [full_name, email, hashedPassword, phone || null, 'active']
        );

        if (result.affectedRows > 0) {
            console.log("Signup Success for:", email);
            return res.status(201).json({ message: "Signup Success" });
        } else {
            console.error("Insert failed: affectedRows is 0");
            return res.status(500).json({ message: "Signup Failed" });
        }

    } catch (error) {
        console.error("Signup DB Error:", error);
        return res.status(500).json({ message: "Signup Failed" });
    }
});

// @desc    Login User
// @route   POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Check user
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password (Sync as per strict req, or async for best practice)
        // Using async await. "bcryptjs" compare is async friendly.
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate Token
        // Payload: { id, email } as per spec
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: '7d' }
        );

        // Return Success
        return res.status(200).json({
            message: "Login Success",
            token: token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login DB Error:", error);
        return res.status(500).json({ message: "Login Failed" });
    }
});


// @desc    Auth with Google
// @route   POST /api/v1/auth/google
// Keeping this as placeholder or basic implementation for now as User focused on Email/Password
export const googleAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;
    // ... Simplified or existing logic can remain but heavily prioritized logic above ...
    // ...
    // Minimal implementation to avoid compile error if referenced elsewhere
    res.status(501).json({ message: "Google Auth not fully implemented in strict spec" });
});

// @desc    Verify Email
// @route   POST /api/v1/auth/verify-email
export const verifyEmail = asyncHandler(async (req, res) => {
    // ...
    res.status(501).json({ message: "Verify Email not fully implemented in strict spec" });
});
