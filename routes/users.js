import express from "express"
import {getUser, getUserFriends, addRemoveFriend} from "../controllers/users.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

//get user by id

//get user friends by id
router.get('/:id/friends', verifyToken, getUserFriends)

router.patch("/:id/:friendId",verifyToken,  addRemoveFriend)
router.get("/:id", verifyToken, getUser)
export default router;



