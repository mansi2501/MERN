import express from "express";
import { addPost, getAllPost, postReactions, getUserPostReaction } from "../controllers/post.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getAllPost);
router.post("/add", upload.single("image"), addPost);
router.get("/:id/reaction", postReactions);
router.post("/:id/reaction", postReactions);
router.put("/:id/reaction", postReactions);
router.delete("/:id/reaction", postReactions);
router.get("/reaction/:userId", getUserPostReaction);
// router.get("/:id/reaction/:userId", getUserPostReaction)

export default router;