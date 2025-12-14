import mysql from "mysql2/promise";
import "dotenv/config";

const getOtp = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute(
            "SELECT * FROM otp_logs WHERE mobile = ? ORDER BY id DESC LIMIT 1",
            ['9360484391']
        );

        if (rows.length > 0) {
            console.log(`LATEST OTP for 9360484391: ${rows[0].otp_code}`);
            console.log(`Expires at: ${rows[0].expires_at}`);
        } else {
            console.log("No OTP found for 9360484391");
        }
        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

getOtp();
