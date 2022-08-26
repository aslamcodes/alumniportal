import asyncHandler from "express-async-handler";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const messages = await Message.find({
    conversation: conversationId,
  });

  if (!messages)
    return res.status(400).json({
      message: "Couldn't find messages for this conversation",
    });

  return res.json(messages);
});

export const createMessage = asyncHandler(async (req, res) => {
  const { user: sender } = req;
  const { conversationId } = req.params;
  const { content } = req.body;
  const message = await Message.create({
    conversation: conversationId,
    sender: sender._id,
    content,
  });
  if (!message)
    return res.status(400).json("Couldn't create the message at the moment");
  return res.json(message);
});

export const updateMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { messageId } = req.params;

  const message = await Message.updateOne(
    {
      _id: messageId,
    },
    {
      $set: {
        content,
      },
    }
  );

  if (!message.modifiedCount)
    return res.status(400).json({ message: "Could'nt update the message" });

  return res.json({ message: "Message updated" });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const messageToDelete = await Message.deleteOne({
    _id: messageId,
  });

  if (!messageToDelete.deletedCount)
    return res.status(400).json({
      message: "Couldn't delete the message",
    });

  return res.json({ message: "Message Deleted" });
});
