import asyncHandler from "express-async-handler";

export const getMessages = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Get Messages");
});

export const createMessage = asyncHandler(async (req, res) => {
  return res.json("Work in Progress:  Create Message");
});

export const updateMessage = asyncHandler(async (req, res) => {
  return res.json("Work in Progress: Update Message");
});

export const deleteMessage = asyncHandler(async (req, res) => {
  return res.json("Work in Progress: Delete Message");
});
