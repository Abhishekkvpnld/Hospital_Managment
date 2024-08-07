import express from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/allMessages", adminAuth,getAllMessages);

export default router;
