import nodemailer from 'nodemailer';
import crypto from 'crypto';
import Otp from '../models/Otp.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Default to Gmail if standard
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// @desc    Send OTP via Email
// @route   POST /api/v1/otp/send
export const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store in DB
    await Otp.create(email, otp);

    // Send Email
    const mailOptions = {
        from: `"Prolync Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your Verification Code - Prolync",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #4f46e5;">Welcome to Prolync!</h2>
                <p>Please use the following OTP to verify your email address and continue with your enrollment.</p>
                <h1 style="background: #f3f4f6; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 5px;">${otp}</h1>
                <p>This code is valid for 5 minutes.</p>
                <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json(new ApiResponse(200, {}, `OTP sent to ${email}`));
    } catch (error) {
        console.error("Email send error:", error);
        throw new ApiError(500, "Failed to send email. Check SMTP config.");
    }
});

// @desc    Verify OTP
// @route   POST /api/v1/otp/verify
export const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

    const record = await Otp.verify(email, otp);

    if (!record) {
        throw new ApiError(400, "Invalid or Expired OTP");
    }

    // Mark used
    await Otp.markUsed(record.id);

    return res.status(200).json(new ApiResponse(200, { verified: true }, "OTP Verified Successfully"));
});
