import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

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
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Auth with Google
// @route   POST /api/v1/auth/google
// @access  Public
export const googleAuth = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
        // User exists, login
        // Ensure googleId is set if not already (linking accounts)
        if (!user.googleId) {
            user.googleId = googleId;
            user.picture = picture; // update picture
            await user.save();
        }
    } else {
        // New user, create
        user = await User.create({
            name,
            email,
            picture,
            googleId,
            isVerified: false // Needs email verification
        });
    }

    // If Verified, return token immediately
    if (user.isVerified) {
        const authToken = generateToken(user._id);
        return res.status(200).json(
            new ApiResponse(200, {
                user,
                token: authToken,
                verified: true
            }, "Login successful")
        );
    }

    // If Not Verified, Send Verification Email
    const verificationToken = uuidv4();
    const tokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins

    user.verificationToken = verificationToken;
    user.tokenExpires = tokenExpires;
    await user.save();

    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: `"Prolync Learning" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your Prolync Account',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #4F46E5; text-align: center;">Welcome to Prolync!</h2>
        <p>Hi ${name},</p>
        <p>Please verify your email address to continue your learning journey.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
        </div>
        <p>This link expires in 15 minutes.</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">If you didn't create an account, please ignore this email.</p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email send error:", error);
        throw new ApiError(500, "Failed to send verification email");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            user: { name: user.name, email: user.email },
            verified: false
        }, "Verification email sent")
    );

});


// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate Verification Token
    const verificationToken = uuidv4();
    const tokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        tokenExpires,
        isVerified: false
    });

    // Send Verification Email
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;
    const mailOptions = {
        from: `"Prolync Learning" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your Prolync Account',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #4F46E5; text-align: center;">Welcome to Prolync!</h2>
        <p>Hi ${name},</p>
        <p>Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
        </div>
        <p>This link expires in 15 minutes.</p>
      </div>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Email send error:", error);
        // Note: User created but email failed. Ideally rollback or allow resend.
    }

    return res.status(201).json(
        new ApiResponse(201, {
            user: { name: user.name, email: user.email },
            verified: false
        }, "Registration successful. Please verify your email.")
    );
});

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (!user.isVerified) {
        return res.status(200).json(
            new ApiResponse(200, { verified: false }, "Please verify your email to login")
        );
    }

    const token = generateToken(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            },
            token,
            verified: true
        }, "Login successful")
    );
});


// @desc    Verify Email
// @route   POST /api/v1/auth/verify-email
// @access  Public
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({
        verificationToken: token,
        tokenExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpires = undefined;
    await user.save();

    const authToken = generateToken(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            user,
            token: authToken,
            verified: true
        }, "Email verified successfully")
    );
});
