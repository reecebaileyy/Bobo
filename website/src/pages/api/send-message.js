import Pusher from "pusher";
import { connectToDB } from "../../lib/db";
import Message from "../../models/Message";

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: "us3",
  useTLS: true,
});


export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const { username, message } = req.body;
        const newMessage = { username, message };
  
        await connectToDB();
        const savedMessage = await Message.create(newMessage);
  
        pusher.trigger("chat-channel", "new-message", savedMessage);
        res.status(200).send({ status: "success" });
      } catch (error) {
        console.error("Error in /api/send-message:", error);
        res.status(500).send({ status: "error", error: error.message });
      }
    } else {
      res.status(405).send({ status: "error", error: "Method not allowed" });
    }
  }