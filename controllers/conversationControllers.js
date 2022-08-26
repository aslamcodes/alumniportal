import asyncHandler from "express-async-handler";
import Conversation from "../models/Conversation.js";
export const getConversationForUser = asyncHandler(async (req, res) => {
  const { user } = req;

  const conversations = await Conversation.find({
    createdBy: user._id,
  });

  if (!conversations)
    return res.json({
      message: "No Conversations",
    });

  return res.json(conversations);
});

export const getConversationById = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Get Conversation by ID");
});

export const createConversation = asyncHandler(async (req, res) => {
  const { user: sender } = req;
  const { receiver } = req.body;
  const conversation = await Conversation.create({
    participants: [sender._id, receiver],
    createdBy: sender._id,
  });

  if (!conversation)
    return res.status(500).json("Couldn't create conversation at the moment.");

  return res.json(conversation);
});

export const deleteConversation = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Delete Conversation by Id");
});
