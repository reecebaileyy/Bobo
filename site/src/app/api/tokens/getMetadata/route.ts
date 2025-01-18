import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

console.log("ENV", process.env.DATABASE_URL)
const MONGO_URI = process.env.DATABASE_URL;
const DATABASE_NAME = "Bobos"; // Replace with your database name
const COLLECTION_NAME = "metadatas"; // Replace with your collection name

// Create a MongoClient instance (use a shared instance for reusability)
let client: MongoClient | null = null;

// Helper function to ensure the MongoDB client is connected
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGO_URI); // FIX THIS ERROR
    await client.connect();
  }
  return client.db(DATABASE_NAME).collection(COLLECTION_NAME);
}

async function getMetadata(tokenId: string) {
  try {
    const collection = await connectToDatabase();

    // Query the collection for metadata by token ID
    const metadata = await collection.findOne({ token: parseInt(tokenId, 10) });

    if (!metadata) {
      return null;
    }

    // Extract `metadata` object from your schema structure
    const { metadata: metadataObj } = metadata;

    return {
      name: metadataObj.name, // Assuming `name` is a field inside `metadata`
      image: metadataObj.image, // Assuming `image` is a field inside `metadata`
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tokenId = searchParams.get("tokenId");

  if (!tokenId) {
    return NextResponse.json({ error: "Token ID is required" }, { status: 400 });
  }

  try {
    const metadata = await getMetadata(tokenId);
    if (!metadata) {
      return NextResponse.json({ error: "Metadata not found" }, { status: 404 });
    }

    return NextResponse.json(metadata, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
