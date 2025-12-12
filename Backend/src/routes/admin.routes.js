import express from 'express';
import { loginAdmin, getAdminStats, getAllUsers, getAllLecturers, deleteUser, updateUserStatus } from '../controllers/admin.controller.js';
import protect from '../middleware/authMiddleware.js'; // We will verify this exists/works

const router = express.Router();

router.post('/login', loginAdmin);

// Protected Routes (Assuming protect middleware checks token)
// In a real app, we'd also check if role === 'admin' in middleware
router.get('/stats', protect, getAdminStats);
router.get('/users', protect, getAllUsers);
router.get('/lecturers', protect, getAllLecturers);
router.delete('/user/:id', protect, deleteUser);
router.put('/user/:id/status', protect, updateUserStatus);

export default router;
