// db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("error", (err) => {
    console.log("Connection error:", err);
    process.exit(1);
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL database"))
    .catch((err) => {
        console.error("Connection error:", err);
        process.exit(1);
    });

export const query = (text, parms) => pool.query(text, parms);

export default pool;
