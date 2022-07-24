import mongoose from "mongoose";
import notificationConstants from "../constants/notification-constants.js";

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
    enum: notificationConstants,
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
  commentedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
