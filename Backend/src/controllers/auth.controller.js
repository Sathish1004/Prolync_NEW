import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
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
// @desc    Login User (Unified for User, Lecturer, Admin)
// @route   POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        let user = null;
        let role = null;
        let table = '';

        // 1. Check User
        const [userRows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (userRows.length > 0) {
            user = userRows[0];
            role = 'user';
        }

        // 2. Check Lecturer (if not found in users)
        if (!user) {
            const [lecturerRows] = await pool.execute("SELECT * FROM lecturers WHERE email = ?", [email]);
            if (lecturerRows.length > 0) {
                user = lecturerRows[0];
                role = 'lecturer';
            }
        }

        // 3. Check Admin (if not found in users or lecturers)
        if (!user) {
            const [adminRows] = await pool.execute("SELECT * FROM admin WHERE email = ?", [email]);
            if (adminRows.length > 0) {
                user = adminRows[0];
                role = 'admin';
            }
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: role },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: '7d' }
        );

        // Return Success
        return res.status(200).json({
            message: "Login Success",
            token: token,
            user: {
                id: user.id,
                full_name: user.full_name || user.name, // Handle varied column names
                email: user.email,
                role: role
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

import axios from 'axios';

// @desc    Send OTP
export const sendOtp = asyncHandler(async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        throw new ApiError(400, "Mobile number is required");
    }

    // Generate 6 digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await Otp.create(mobile, otpCode);

    // Send SMS via Fast2SMS
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (apiKey) {
        try {
            await axios.get('https://www.fast2sms.com/dev/bulkV2', {
                headers: {
                    authorization: apiKey
                },
                params: {
                    variables_values: otpCode,
                    route: 'otp',
                    numbers: mobile
                }
            });
            console.log(`[Fast2SMS] OTP sent to ${mobile}`);
        } catch (smsError) {
            console.error("[Fast2SMS] Error:", smsError.response?.data || smsError.message);
            console.log(`[FALLBACK - MOCK SMS] OTP for ${mobile} is: ${otpCode}`);
        }
    } else {
        console.log("To enable Real SMS, add FAST2SMS_API_KEY to .env");
    }

    // ALWAYS LOG OTP FOR DEMO/TESTING PURPOSE (Per Request)
    console.log(`[DEMO MODE] OTP for ${mobile} is: ${otpCode}`);

    return res.status(200).json(
        new ApiResponse(200, { mobile }, "OTP sent successfully")
    );
});

// @desc    Verify OTP and Register/Login User
export const verifyOtp = asyncHandler(async (req, res) => {
    const { mobile, otp, userData } = req.body;

    console.log(`[VERIFY OTP] Request: Mobile=${mobile}, OTP=${otp}, UserData=${JSON.stringify(userData)}`);

    if (!mobile || !otp) {
        throw new ApiError(400, "Mobile and OTP are required");
    }

    // 1. Verify OTP
    const otpRecord = await Otp.verify(mobile, otp);
    console.log(`[VERIFY OTP] OTP Record Found:`, otpRecord);

    if (!otpRecord) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    // 2. Check/Create/Update User
    const [existingUsers] = await pool.execute("SELECT * FROM users WHERE mobile = ?", [mobile]);
    let user = existingUsers[0];
    console.log(`[VERIFY OTP] Existing User:`, user ? user.id : "None");

    try {
        if (!user && userData) {
            console.log("[VERIFY OTP] Creating New User...");
            const newUser = await User.create({
                name: userData.fullName,
                email: userData.email,
                mobile: mobile,
                qualification: userData.qualification,
                profile: userData.profile,
                graduationYear: userData.graduationYear,
                language: userData.language,
                isVerified: true
            });
            user = await User.findById(newUser._id);
            console.log("[VERIFY OTP] New User Created:", user.id);

        } else if (user && userData) {
            console.log("[VERIFY OTP] Updating Existing User...");
            await pool.execute(`
                UPDATE users SET 
                full_name = ?, email = ?, qualification = ?, profile = ?, graduation_year = ?, language = ?, is_verified = 1
                WHERE id = ?
            `, [
                userData.fullName || user.full_name,
                userData.email || user.email,
                userData.qualification || user.qualification || null,
                userData.profile || user.profile || null,
                userData.graduationYear || user.graduation_year || null,
                userData.language || user.language || null,
                user.id
            ]);
            user = await User.findById(user.id);

        } else if (!user) {
            throw new ApiError(400, "User not found and no registration data provided");
        }
    } catch (dbError) {
        console.error("[VERIFY OTP] DB Error:", dbError);
        throw new ApiError(500, "Failed to create/update user account");
    }

    // 3. Mark OTP as Used (Only after successful user processing)
    await Otp.markUsed(otpRecord.id);

    // 4. Generate Token
    const token = jwt.sign(
        { id: user._id, email: user.email, role: 'user' },
        process.env.JWT_SECRET || "SECRET_KEY",
        { expiresIn: '7d' }
    );

    return res.status(200).json(
        new ApiResponse(200, {
            verified: true,
            token,
            user: {
                id: user._id,
                name: user.name || user.full_name,
                email: user.email,
                mobile: user.mobile
            }
        }, "OTP verified and User logged in")
    );
});

// @desc    Verify Email
// @route   POST /api/v1/auth/verify-email
export const verifyEmail = asyncHandler(async (req, res) => {
    // ...
    res.status(501).json({ message: "Verify Email not fully implemented in strict spec" });
});
