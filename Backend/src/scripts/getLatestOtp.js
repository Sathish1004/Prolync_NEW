import mysql from "mysql2/promise";
import "dotenv/config";

const getLatestOtp = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    const [rows] = await connection.execute("SELECT * FROM otp_logs ORDER BY id DESC LIMIT 1");
    console.log("Latest OTP Record:", rows[0]);
    await connection.end();
};

getLatestOtp();
