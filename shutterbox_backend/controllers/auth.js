import { query } from "../db/db.js";
import { createUserQuery, createUserTableQuery, loginUserQuery } from "../utils/sqlQuery.js";
// import { Resend } from 'resend';

export async function createUser(req, res) {
    const { userName, email, password } = req.body;

    try {
        const tableCheck = await query(`SELECT to_regclass('user_details')`);
        console.log("Table check:", tableCheck.rows);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createUserTableQuery);
            console.log("Table created");
        }
        const newUser = await query(createUserQuery, [userName, email, password]);
        console.log("User inserted:", newUser.rows[0]);

        res.status(200).json({
            status: 200,
            message: "User registered successfully",
            user: {
                id: newUser.rows[0].id,
                userName: newUser.rows[0].username,
                email: newUser.rows[0].email,
                password: newUser.rows[0].password
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const tableCheck = await query(`SELECT to_regclass('user_details')`);
        if (!tableCheck.rows[0].to_regclass) {
            return res.status(400).json({ message: "User table does not exist. Please register first." });
        }
        const result = await query(loginUserQuery, [email.trim(), password.trim()]);
        console.log("Login query result:", result.rows);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const user = result.rows[0];
        console.log("user", user);

        res.status(200).json({
            status: 200,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// export async function forgotPassword(req, res) {

// const resend = new Resend('re_ZDSJBKuo_84mwqYYdKuKJzygLkvpqUxEm');

// resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: 'mansi.trivedi2501@gmail.com',
//     subject: 'Hello World',
//     html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });
// }