import express from "express";
import { addPost, getAllPost, postReactions, getUserPostReaction } from "../controllers/post.js";
import multer from "multer";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", verifyAccessToken, getAllPost);
router.post("/add", verifyAccessToken, upload.single("image"), addPost);
router.get("/:id/reaction", verifyAccessToken, postReactions);
router.post("/:id/reaction", verifyAccessToken, postReactions);
router.put("/:id/reaction", verifyAccessToken, postReactions);
router.delete("/:id/reaction", verifyAccessToken, postReactions);
router.get("/reaction/:userId", verifyAccessToken, getUserPostReaction);
// router.get("/:id/reaction/:userId", getUserPostReaction)

export default router;