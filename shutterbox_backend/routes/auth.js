import express from "express";
import { createUser, loginUser, refreshToken, resetPassword, sendEmail, verifyResetPasswordToken } from "../controllers/auth.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/resend", sendEmail);
router.post("/update-password", resetPassword);
router.get("/verify-token", verifyResetPasswordToken);

router.post("/refresh-token", refreshToken);

router.get("/protected", verifyAccessToken, (req, res) => {
    res.status(200).json({
        message: "You accessed a protected route!",
        user: req.user, // available because verifyAccessToken adds it
    });
});

export default router;