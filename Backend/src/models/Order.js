import { pool } from '../config/db.js';

const Order = {
    create: async ({ userId, courseId, razorpayOrderId, amount, currency, status }) => {
        const query = `
            INSERT INTO orders (user_id, course_id, razorpay_order_id, amount, currency, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [userId, courseId, razorpayOrderId, amount, currency, status || 'created'];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    findByOrderId: async (razorpayOrderId) => {
        const [rows] = await pool.execute("SELECT * FROM orders WHERE razorpay_order_id = ?", [razorpayOrderId]);
        return rows[0];
    },

    updateStatus: async (razorpayOrderId, status, paymentId) => {
        const query = `UPDATE orders SET status = ?, payment_id = ? WHERE razorpay_order_id = ?`;
        await pool.execute(query, [status, paymentId, razorpayOrderId]);
    },

    createEnrollment: async (userId, courseId) => {
        const query = `
            INSERT INTO enrollments (user_id, course_id, access_granted)
            VALUES (?, ?, true)
            ON DUPLICATE KEY UPDATE access_granted = true
        `;
        await pool.execute(query, [userId, courseId]);
    },

    checkEnrollment: async (userId, courseId) => {
        const [rows] = await pool.execute(
            "SELECT * FROM enrollments WHERE user_id = ? AND course_id = ? AND access_granted = true",
            [userId, courseId]
        );
        return !!rows[0];
    }
};

export default Order;
