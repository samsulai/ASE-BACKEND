import express from "express"
import {getFeedPosts, getUserPosts, likePost, getFeedPostById, getPostByCategoryandLimit} from "../controllers/posts.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router()


router.get("/", getFeedPosts)
router.get("/feed",getPostByCategoryandLimit)
router.get("/:id", getFeedPostById)

export default router