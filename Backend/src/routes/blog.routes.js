import { Router } from 'express';
import {
    getAllBlogs,
    getBlogBySlug,
    getLatestBlogs,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blog.controller.js';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/latest', getLatestBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes (Protected - add middleware later)
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
