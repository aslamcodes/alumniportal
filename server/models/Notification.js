import mongoose from "mongoose";

const { model, Schema } = mongoose;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "like",
      "comment",
      "reply",
      "alumni-request",
      "alumni-reject",
      "alumni-approved",
      "post-created",
      "post-updated",
      "post-deleted",
    ],
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "ForumPost",
    required: false,
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "ForumComment",
    required: false,
  },
  alumniRequest: {
    type: Schema.Types.ObjectId,
    ref: "AlumniRequest",
    required: false,
  },
});

const Notification = model("Notification", notificationSchema);

export default Notification;
