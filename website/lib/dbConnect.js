import { MongoClient } from "mongodb";
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
  if (MongoClient.connection.readyState >= 1) {
    return;
  }

  return MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = { default: dbConnect };
