import express from 'express';
import {
    loginAdmin,
    getAdminStats,
    getAllUsers,
    getAllLecturers,
    deleteUser,
    updateUserStatus,
    getPendingContent,
    approveContent,
    rejectContent,
    getAllContent
} from '../controllers/admin.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);

// Protected Routes
router.use(protect);
// router.use(authorize('admin')); // Todo: Enable after confirming admin role

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/lecturers', getAllLecturers);
router.delete('/user/:id', deleteUser);
router.put('/user/:id/status', updateUserStatus);

// Content Approval
router.get('/content/pending', getPendingContent);
router.get('/lecturer/uploads', getAllContent);

// Specific Approve/Reject Routes
router.put('/lecturer/upload/:id/approve', approveContent);
router.put('/lecturer/upload/:id/reject', rejectContent);

export default router;
