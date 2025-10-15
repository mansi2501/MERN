import express from "express";
import { addPost, getAllPost } from "../controllers/post.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getAllPost);
router.post("/add", upload.single("image"), addPost);

export default router;