import { query } from "../db/db.js";
import { createUserQuery, createUserTableQuery, loginUserQuery, updatePasswordQuery, updateTokenQuery, veryfyTokenQuery } from "../utils/sqlQuery.js";
import { Resend } from 'resend';
import fs from "fs";
import path from "path";
import mjml2html from 'mjml';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function createUser(req, res) {
    const { userName, email, password } = req.body;
    try {
        const tableCheck = await query(`SELECT to_regclass('user_details')`);
        console.log("Table check:", tableCheck.rows);

        if (!tableCheck.rows[0].to_regclass) {
            await query(createUserTableQuery);
            console.log("Table created");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await query(createUserQuery, [userName, email, hashedPassword]);

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
        res.status(500).json({ message: "server error" });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Check if table exists
        const tableCheck = await query(`SELECT to_regclass('user_details')`);
        if (!tableCheck.rows[0].to_regclass) {
            return res.status(400).json({ message: "User table does not exist. Please register first." });
        }

        // 1️⃣ Fetch user by email only (DO NOT hash password here)
        const result = await query(loginUserQuery, [email.trim()]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2️⃣ Compare plain password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        // 3️⃣ Also allow plain text password (temporary fallback)
        if (!isMatch && user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 4️⃣ Successful login
        res.status(200).json({
            status: 200,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function resetPassword(req, res) {
    const { token, password } = req.body;
    try {
        const tableCheck = await query(`SELECT to_regclass('user_details')`);
        if (!tableCheck.rows[0].to_regclass) {
            return res.status(400).json({ message: "User table does not exist. Please register first." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await query(updatePasswordQuery, [hashedPassword, token]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Your Token is expired..." });
        }
        res.status(200).json({
            status: 200,
            message: "Password Updated Successfully!!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function sendEmail(req, res) {
    const { email, userName } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const resetToken = uuidv4();
        const expiryTime = new Date(Date.now() + 1 * 60 * 1000); // 1 min
        // const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hours

        await query(updateTokenQuery, [resetToken, expiryTime, email]);

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        const templatePath = path.resolve('emails/templates/resetPasswordEmail.mjml');
        let mjmlTemplate = fs.readFileSync(templatePath, 'utf-8');

        mjmlTemplate = mjmlTemplate
            .replace('{{userName}}', userName || 'User')
            .replace('{{resetLink}}', resetLink);

        const { html } = mjml2html(mjmlTemplate);

        const { data, error } = await resend.emails.send({
            from: "Website <website@resend.dev>",
            to: email,
            subject: "Reset Your Password",
            html,
        });

        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: "Failed to send email", error });
        }

        console.log('Email sent successfully:', data);
        res.status(200).json({
            message: "Reset password email sent successfully",
            resetLink,
            data
        });

    } catch (error) {
        console.error('Error in sendEmail:', error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function verifyToken(req, res) {
    const { token } = req.query;
    try {
        const result = query(veryfyTokenQuery, [token]);

        if (!result.rows || result.rows.length === 0) {
            return res.status(400).json({ valid: false, message: "Invalid or missing token..." });
        }
        const expiryTime = new Date(result.rows[0].token_expiry);
        if (new Date() > expiryTime) {
            return res.status(400).json({ valid: false, message: "Token expired" });
        }
        return res.status(200).json({ valid: true });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ valid: false, message: "Server error" });
    }
}