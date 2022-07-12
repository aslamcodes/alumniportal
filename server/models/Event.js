import mongoose from "mongoose";

const { Schema, model } = mongoose;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  time: { type: Date, required: true },
});

const Event = model("Event", eventSchema);

export default Event;
