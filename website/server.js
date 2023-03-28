require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET,
  cluster: "us3",
  useTLS: true,
});

app.post("/api/send-message", (req, res) => {
    try {
      const { username, message } = req.body;
      pusher.trigger("chat-channel", "new-message", { username, message });
      res.status(200).send({ status: "success" });
    } catch (error) {
      console.error("Error in /api/send-message:", error);
      res.status(500).send({ status: "error", error: error.message });
    }
  });

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
