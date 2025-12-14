import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';
import auth from '../middleware/authMiddleware.js'; // Optional: Verify user login before payment

const router = Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

export default router;
