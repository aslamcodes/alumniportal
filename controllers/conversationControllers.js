import asyncHandler from "express-async-handler";

export const getConversationForUser = asyncHandler(async (req, res) => {
  return res.json("Work in Progress: Get Conversations");
});

export const getConversationById = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Get Conversation by ID");
});

export const createConversation = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Create Conversation");
});

export const deleteConversation = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Delete Conversation by Id");
});
