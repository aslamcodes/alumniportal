import express from "express";
import {
  createConversation,
  deleteConversation,
  getConversationById,
  getConversationForUser,
} from "../controllers/conversationControllers.js";
import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "../controllers/messageControllers.js";
import { protect } from "../middleware/authMiddlewares.js";

const router = express.Router();

// Conversation Routes
router.get("/", protect, getConversationForUser);
router.get("/:conversationId", protect, getConversationById);
router.post("/", protect, createConversation);
router.delete("/:conversationId", protect, deleteConversation);

// Message Routes
router.get("/:conversationId/messages", protect, getMessages);
router.post("/message/:conversationId", protect, createMessage);
router.patch("/message/:messageId", protect, updateMessage);
router.delete("/message/:messageId", protect, deleteMessage);

export default router;
