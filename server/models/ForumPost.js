import mongoose from "mongoose";
import Comment from "../models/ForumComment.js";
import Like from "../models/ForumPostLike.js";
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      images: [
        {
          type: String,
          required: true,
        },
      ],
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("deleteOne", async function (next) {
  const postId = this.getQuery()._id;
  try {
    await Comment.deleteMany({ post: postId });
    await Like.deleteOne({ post: postId });
  } catch (error) {
    next(err);
  }
});

const ForumPost = model("ForumPost", postSchema);

export default ForumPost;
