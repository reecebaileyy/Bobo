const fs = require('fs');
const { connectDatabase } = require('./database');
const { Metadata } = require('./metadata'); // Assuming you've exported the Metadata model from your metadata file

async function importMetadata() {
    console.log("started");

  // Read the metadata JSON file
  const metadataJson = fs.readFileSync('metadata.json', 'utf-8');
  const metadataArray = JSON.parse(metadataJson);

  console.log("Read the file");

  // Connect to the MongoDB database
  await connectDatabase();

  // Loop through the metadata array and insert each metadata object into the database
  for (const metadata of metadataArray) {
    console.log("begin loop");
    const newMetadata = new Metadata(metadata);
    await newMetadata.save();
    console.log(`Imported metadata for tokenId ${metadata.tokenId}`);
  }

  console.log('Metadata import complete');
}

importMetadata().catch((error) => {
  console.error('Failed to import metadata:', error.message);
});
