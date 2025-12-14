import mysql from "mysql2/promise";
import "dotenv/config";

const debugDb = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    const mobile = '9360484391';

    console.log("--- OTP LOGS ---");
    const [otps] = await connection.execute("SELECT * FROM otp_logs WHERE mobile = ? ORDER BY id DESC LIMIT 5", [mobile]);
    console.table(otps);

    console.log("\n--- USERS ---");
    const [users] = await connection.execute("SELECT * FROM users WHERE mobile = ?", [mobile]);
    console.table(users);

    await connection.end();
};

debugDb();
