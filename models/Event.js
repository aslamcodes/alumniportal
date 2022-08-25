import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  venue: { type: String, required: true },
  isApproved: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = model("Event", eventSchema);

export default Event;
