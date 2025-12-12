import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`\n MySQL Connected`);
        connection.release();
    } catch (error) {
        console.log("MySQL connection error ", error);
        process.exit(1);
    }
};

export { pool };
export default connectDB;
