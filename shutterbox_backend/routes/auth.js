import express from "express";
import { createUser, loginUser, resetPassword, sendEmail, verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/resend", sendEmail);
router.post("/update-password", resetPassword);
router.get("/verify-token", verifyToken);

export default router;