import mongoose from "mongoose";

const { Schema, model } = mongoose;

const resetTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const ResetToken = model("ResetToken", resetTokenSchema);

export default ResetToken;
