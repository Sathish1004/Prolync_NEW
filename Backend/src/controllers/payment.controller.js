import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

import { pool } from '../config/db.js';

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
});

// @desc    Create Razorpay Order
// @route   POST /api/v1/payment/create-order
export const createOrder = asyncHandler(async (req, res) => {
    const { userId, courseId, amount, currency } = req.body;

    if (!userId || !courseId || !amount) {
        throw new ApiError(400, "User ID, Course ID, and Amount are required");
    }

    const options = {
        amount: amount * 100, // Amount in paise
        currency: currency || "INR",
        receipt: `receipt_order_${Date.now()}`
    };

    try {
        // 1. Check for Duplicate Payment / Enrollment
        const [existingEnrollment] = await pool.execute(
            "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?",
            [userId, courseId]
        );

        if (existingEnrollment.length > 0) {
            throw new ApiError(400, "Payment already completed. You already have access to this course.");
        }

        // 2. Check for Paid Orders (Double Safety)
        const [paidOrders] = await pool.execute(
            "SELECT * FROM orders WHERE user_id = ? AND course_id = ? AND status = 'paid'",
            [userId, courseId]
        );

        if (paidOrders.length > 0) {
            throw new ApiError(400, "Payment already completed.");
        }

        const order = await razorpay.orders.create(options);

        // Save order to DB
        await Order.create({
            userId,
            courseId,
            razorpayOrderId: order.id,
            amount,
            currency: order.currency,
            status: 'created'
        });

        return res.status(200).json(
            new ApiResponse(200, order, "Order created successfully")
        );
    } catch (error) {
        console.error("Razorpay Error:", error);
        throw new ApiError(500, "Something went wrong in creating order");
    }
});

// @desc    Verify Payment
// @route   POST /api/v1/payment/verify
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder')
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // Payment Success
        await Order.updateStatus(razorpay_order_id, 'paid', razorpay_payment_id);

        // Enroll User
        await Order.createEnrollment(userId, courseId);

        return res.status(200).json(
            new ApiResponse(200, { success: true }, "Payment verified and Course Access Granted")
        );
    } else {
        // Payment Failed
        await Order.updateStatus(razorpay_order_id, 'failed', null);
        throw new ApiError(400, "Invalid Payment Signature");
    }
});
