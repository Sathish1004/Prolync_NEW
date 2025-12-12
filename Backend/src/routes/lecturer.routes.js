import express from 'express';
import { loginLecturer, registerLecturer, createCourse, getMyStudents } from '../controllers/lecturer.controller.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerLecturer);
router.post('/login', loginLecturer);

// Protected Routes
router.post('/course/create', protect, createCourse);
router.get('/mystudents', protect, getMyStudents);

export default router;
