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

AlumniRequestSchema.pre("findOneAndUpdate", async function (next) {
  const { rejected: isRejected, reasonOfRejection } = this.getUpdate()["$set"];
  const { _id: requestId } = this.getQuery();
  const { user: requestedUser } = await AlumniRequest.findById(requestId);

  if (!isRejected) return next();

  const existingNotification = await Notification.findOne({
    user: requestedUser,
    type: notificationConstants.ALUMNI_REJECT,
  });

  if (existingNotification) return next();

  await Notification.create({
    user: requestedUser,
    message: `Your request has been rejected. Reason: ${reasonOfRejection}`,
    type: notificationConstants.ALUMNI_REJECT,
  });

  await RejectedApplication.create({
    user: requestedUser,
  });

  return next();
});

const AlumniRequest = model("AlumniRequest", AlumniRequestSchema);

export default AlumniRequest;
