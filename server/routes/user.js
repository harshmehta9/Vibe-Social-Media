import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {getUser, getUserFriends, addRemoveFriends} from "../controllers/user.js"

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addRemoveFriends)

export default router;