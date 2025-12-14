import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Initiate Google Login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle callback
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        try {
            const profile = req.user;
            const email = profile.emails[0].value;

            let user = await User.findOne({ email });

            if (user) {
                // User exists, update googleId if missing or changed
                if (user.googleId !== profile.id) {
                    // Update user instance with new google info
                    user.googleId = profile.id;
                    user.picture = profile.photos[0].value;
                    // We need a way to save. The findOne I saw returns an object with a save() method helper!
                    if (user.save) {
                        await user.save();
                    } else {
                        // Fallback if findOne didn't return the helper wrapper (it should based on my read of User.js)
                        // But let's be safe and just rely on the object being right
                    }
                }
            } else {
                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: email,
                    googleId: profile.id,
                    picture: profile.photos[0].value,
                    isVerified: true, // Google emails are verified
                    verificationToken: null,
                    tokenExpires: null
                });
            }

            // Generate Token
            const token = jwt.sign(
                {
                    id: user._id, // DB ID
                    email: user.email,
                    name: user.name,
                    role: "USER", // Default, could fetch from DB if I add role to User model
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" } // Match .env JWT_EXPIRE
            );

            // Redirect to frontend
            const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
            res.redirect(`${frontendUrl}/oauth-success?token=${token}`);

        } catch (error) {
            console.error("Google Auth Error:", error);
            res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=auth_failed`);
        }
    }
);

export default router;
