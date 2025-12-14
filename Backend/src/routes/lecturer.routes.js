import express from 'express';
import {
    loginLecturer,
    registerLecturer,
    createCourse,
    getMyStudents,
    uploadContent,
    createQuiz,
    getContentStatus,
    getDashboardStats
} from '../controllers/lecturer.controller.js';
import protect from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register', registerLecturer);
router.post('/login', loginLecturer);

// Protected Routes (Lecturer Only)
router.use(protect);
router.use(authorize('lecturer'));

router.post('/course/create', createCourse);
router.get('/mystudents', getMyStudents);

// Dashboard Routes
router.get('/dashboard-stats', getDashboardStats);

// Content Management
router.post('/content/upload', upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'notes', maxCount: 1 }
]), uploadContent);

router.get('/content/status', getContentStatus);

// Quiz Management
router.post('/quiz/create', createQuiz);

export default router;
