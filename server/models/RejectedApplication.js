import mongoose from "mongoose";

const { model, Schema } = mongoose;

const rejectedApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const RejectedApplication = model(
  "RejectedApplication",
  rejectedApplicationSchema
);

export default RejectedApplication;
