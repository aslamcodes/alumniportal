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

// commentSchema.pre("deleteMany", async function (next) {
//   try {
//     const post = this.getQuery()._id;
//     // comments to delete
//     const commentsToBeDeleted = await ForumCommentReply.find({
//       post: post,
//     });
//     // delete replies

//     await ForumCommentReply.deleteMany({ comment: post });
//   } catch (error) {
//     next(error);
//   }
// });

const Comment = mongoose.model("ForumComment", commentSchema);

export default Comment;
