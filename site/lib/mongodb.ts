import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URL!;
const MONGODB_DB = process.env.MONGODB_DB!;

interface Cached {
  conn: { client: MongoClient; db: Db } | null;
  promise: Promise<{ client: MongoClient; db: Db }> | null;
}

// Extend the global object to include the `mongo` property
declare global {
  namespace NodeJS {
    interface Global {
      mongo: Cached | undefined;
    }
  }
}

// Use `global` with the extended type
let cached: Cached = global.mongo || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Assign the cached object to the global.mongo property
global.mongo = cached;
