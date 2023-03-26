const { connectDatabase } = require('./database');
const { Metadata } = require('./metadata'); // Assuming you've exported the Metadata model from your metadata file
const mongoose = require('mongoose');

async function fetchMetadata(tokenId) {
  // Connect to the MongoDB database
  await connectDatabase();

  // Find the metadata for the given tokenId
  const metadata = await Metadata.findOne({ tokenId });
  console.log(metadata)

  if (metadata) {
    console.log(`Metadata for tokenId ${tokenId}:`, metadata);
  } else {
    console.log(`No metadata found for tokenId ${tokenId}`);
  }
}

// Replace 1 with the tokenId you want to fetch metadata for
fetchMetadata(1).catch((error) => {
  console.error('Failed to fetch metadata:', error.message);
});
