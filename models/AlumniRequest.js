import mongoose from "mongoose";
import notificationConstants from "../constants/notification-constants.js";
import Notification from "./Notification.js";
import RejectedApplication from "./RejectedApplication.js";

const { Schema, model } = mongoose;

const AlumniRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  reasonOfRejection: {
    type: String,
    default: "",
  },
});

const AlumniRequest = model("AlumniRequest", AlumniRequestSchema);

export default AlumniRequest;
