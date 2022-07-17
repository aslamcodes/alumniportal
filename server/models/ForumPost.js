import mongoose from "mongoose";

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

const ForumPost = model("ForumPost", postSchema);

export default ForumPost;
