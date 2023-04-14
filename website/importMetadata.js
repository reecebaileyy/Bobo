require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { connectToDatabase } = require('./lib/mongodb'); 
const Metadata = require('./models/Metadata');

const metadataDirectory = path.join(process.cwd(), 'public', 'metadata');

(async () => {
  try {
    const { db } = await connectToDatabase(); 

    const files = fs.readdirSync(metadataDirectory);

    for (const file of files) {
      const token = parseInt(file.replace('.json', ''), 10);
      const metadataPath = path.join(metadataDirectory, file);
      const metadataJSON = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

      const existingMetadata = await db.collection('metadatas').findOne({ token }); // Use the db object to query the collection

      if (!existingMetadata) {
        await db.collection('metadatas').insertOne({ token, metadata: metadataJSON }); // Use the db object to insert new metadata
        console.log(`Imported token ${token}`);
      } else {
        console.log(`Token ${token} already exists in the database`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
