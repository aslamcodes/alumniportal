import mongoose from "mongoose";

const forumCommentReplySchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumComment",
      required: true,
    },
    reply: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ForumCommentReply = mongoose.model(
  "ForumCommentReply",
  forumCommentReplySchema
);

export default ForumCommentReply;
