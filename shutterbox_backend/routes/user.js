import express from "express";
import { getUserDetails, updateUserDetails } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUserDetails)
router.put("/:id", updateUserDetails)

export default router;