// Import any required dependencies here
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define the generateMetadata function
async function generateMetadata(tokenId, customName) {
  // Get a reference to the MongoDB database
  const db = mongoose.connection.db;

  // Implement your metadata generation logic here
  const metadata = {
    name: customName || `NFT #${tokenId}`,
    description: 'Friendly OpenSea Creature',
    image: 'https://opensea-prod.appspot.com/puffs/3.png',
    attributes: [
      { trait_type: 'Base', value: 'Starfish' },
      { trait_type: 'Eyes', value: 'Big' },
      { trait_type: 'Mouth', value: 'Surprised' }
    ]
  };

  // Insert the metadata into the database
  const metadataCollection = db.collection('metadata');
  const result = await metadataCollection.updateOne(
    { tokenId: tokenId },
    { $set: metadata },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    metadata._id = result.upsertedId;
  }

  return metadata;
}

// Export the generateMetadata function
module.exports = { generateMetadata };
