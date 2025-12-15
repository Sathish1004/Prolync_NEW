import { pool } from '../config/db.js';

const Otp = {
    create: async (identifier, otpCode) => {
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
        const isEmail = identifier.includes('@');
        console.log(`[OTP DB] Creating: ${identifier}, Code=${otpCode}`);

        const query = `
            INSERT INTO otp_logs (${isEmail ? 'email' : 'mobile'}, otp_code, expires_at)
            VALUES (?, ?, ?)
        `;
        await pool.execute(query, [identifier, otpCode, expiresAt]);
    },

    verify: async (identifier, otpCode) => {
        console.log(`[OTP DB] Verifying: ${identifier}, Code=${otpCode}`);
        const isEmail = identifier.includes('@');
        const col = isEmail ? 'email' : 'mobile';

        const query = `
            SELECT * FROM otp_logs 
            WHERE ${col} = ? AND otp_code = ? AND is_used = FALSE AND expires_at > ?
            ORDER BY created_at DESC LIMIT 1
        `;
        const [rows] = await pool.execute(query, [identifier, otpCode, new Date()]);
        return rows[0];
    },

    markUsed: async (id) => {
        console.log(`[OTP DB] Marking Used: ID=${id}`);
        await pool.execute("UPDATE otp_logs SET is_used = TRUE WHERE id = ?", [id]);
    }
};

export default Otp;
