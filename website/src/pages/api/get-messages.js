// pages/api/get-messages.js

let messages = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(messages);
  } else {
    res.status(405).send({ status: "error", error: "Method not allowed" });
  }
}
