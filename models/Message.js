import mongoose from "mongoose";

const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

export default Message;
