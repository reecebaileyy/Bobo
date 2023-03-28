// models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
