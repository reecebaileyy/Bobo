// pages/api/get-messages.js
import { connectToDB } from "../../lib/db";
import Message from "../../models/Message";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectToDB();
    const messages = await Message.find();
    res.status(200).json(messages);
  } else {
    res.status(405).send({ status: "error", error: "Method not allowed" });
  }
}
