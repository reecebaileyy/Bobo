import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connect() {
  if (!client.isConnected()) await client.connect();
  return client.db("Bobo").collection("nft_metadata");
}

export default async function handler(req, res) {
  const collection = await connect();

  if (req.method === "GET") {
    const metadata = await collection.findOne({ id: "1" });
    res.status(200).json(metadata);
  } else if (req.method === "POST") {
    const newName = req.body.newName;
    const filter = { id: "1" };
    const update = { $set: { name: newName } };
    await collection.updateOne(filter, update);
    const updatedMetadata = await collection.findOne({ id: "1" });
    res.status(201).json(updatedMetadata);
  }
}
