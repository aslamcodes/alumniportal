import mongoose from "mongoose";

const { Schema, model } = mongoose;

const forumPostRequestSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "ForumPost",
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ForumPostRequest = model("ForumPostRequest", forumPostRequestSchema);

export default ForumPostRequest;
