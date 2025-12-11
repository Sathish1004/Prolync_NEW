import { Router } from 'express';
import { googleAuth, verifyEmail, register, login } from '../controllers/auth.controller.js';

const router = Router();

router.post('/google', googleAuth);
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

export default router;
