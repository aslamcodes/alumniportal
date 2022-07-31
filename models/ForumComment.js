import mongoose from "mongoose";
import ForumCommentReply from "./ForumCommentReply.js";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ForumPost",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre("deleteOne", async function (next) {
  try {
    const commentId = this.getQuery()._id;

    const deleteReplies = await ForumCommentReply.deleteMany({
      comment: commentId,
    });

    if (!deleteReplies) {
      return next(new Error("Can't delete replies"));
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Comment = mongoose.model("ForumComment", commentSchema);

export default Comment;
