import { pool } from '../config/db.js';

const Otp = {
    create: async (mobile, otpCode) => {
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        console.log(`[OTP DB] Creating: Mobile=${mobile}, Code=${otpCode}, Expires=${expiresAt.toISOString()}`);
        const query = `
            INSERT INTO otp_logs (mobile, otp_code, expires_at)
            VALUES (?, ?, ?)
        `;
        await pool.execute(query, [mobile, otpCode, expiresAt]);
    },

    verify: async (mobile, otpCode) => {
        console.log(`[OTP DB] Verifying: Mobile=${mobile}, Code=${otpCode}`);
        const query = `
            SELECT * FROM otp_logs 
            WHERE mobile = ? AND otp_code = ? AND is_used = FALSE AND expires_at > ?
            ORDER BY created_at DESC LIMIT 1
        `;
        const [rows] = await pool.execute(query, [mobile, otpCode, new Date()]);
        console.log(`[OTP DB] Result Rows: ${rows.length}`, rows[0]);
        return rows[0];
    },

    markUsed: async (id) => {
        console.log(`[OTP DB] Marking Used: ID=${id}`);
        await pool.execute("UPDATE otp_logs SET is_used = TRUE WHERE id = ?", [id]);
    }
};

export default Otp;
