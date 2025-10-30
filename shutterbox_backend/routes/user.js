import express from "express";
import { getUserDetails, updateUserDetails } from "../controllers/user.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", verifyAccessToken, getUserDetails)
router.put("/:id", verifyAccessToken, updateUserDetails)

export default router;