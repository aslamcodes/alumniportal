import mongoose from "mongoose";

const forumPostLikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ForumPost",
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const ForumPostLike = mongoose.model("ForumPostLike", forumPostLikeSchema);

export default ForumPostLike;
