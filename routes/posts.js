import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  getFeedPostById,
  getPostByCategoryandLimit,
  getPaginatedPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getFeedPosts);
router.get("/feed", getPostByCategoryandLimit);
router.get("/news", getPaginatedPost);
router.get("/:id", getFeedPostById);

export default router;
