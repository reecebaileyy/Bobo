import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { connectToDatabase } from './lib/mongodb';
import { Collection, Db } from 'mongodb';

interface MetadataAttributes {
  trait_type: string;
  value: string;
}

interface Metadata {
  description: string;
  image: string;
  name: string;
  attributes: MetadataAttributes[];
}

interface MetadataDocument {
  token: number;
  metadata: Metadata;
}

const metadataDirectory = path.join(process.cwd(), 'public', 'metadata');

(async () => {
  try {
    const { db }: { db: Db } = await connectToDatabase(); // Connect to MongoDB
    const metadataCollection: Collection<MetadataDocument> = db.collection('metadatas');

    const files = fs.readdirSync(metadataDirectory); // Read all files in the directory

    for (const file of files) {
      // Extract token ID from the filename (assuming filenames are like "1.json", "2.json", etc.)
      const token = parseInt(file.replace('.json', ''), 10);
      const metadataPath = path.join(metadataDirectory, file);
      const metadataJSON: Metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

      // Check if the token already exists in the database
      const existingMetadata = await metadataCollection.findOne({ token });

      if (!existingMetadata) {
        // Insert new metadata if it doesn't exist
        await metadataCollection.insertOne({ token, metadata: metadataJSON });
        console.log(`Imported token ${token}`);
      } else {
        console.log(`Token ${token} already exists in the database`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
