import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AlumniRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reasonOfRejection: {
    type: String,
    default: "",
  },
});

AlumniRequestSchema.post("findOneAndUpdate", async function (doc, next) {});

const AlumniRequest = model("AlumniRequest", AlumniRequestSchema);

export default AlumniRequest;
