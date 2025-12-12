import { Router } from 'express';
import { googleAuth, verifyEmail, register, login } from '../controllers/auth.controller.js';
import auth from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Maintain existing or placeholder routes
router.post('/google', googleAuth);
router.post('/verify-email', verifyEmail);

// Protected Route Example
router.get('/profile', auth, (req, res) => {
    res.status(200).json({
        message: "Protected Route Accessed",
        user: req.user
    });
});

export default router;
