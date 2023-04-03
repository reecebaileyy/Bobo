// src/api/update-metadata.js
const fs = require('fs');
const path = require('path');

const metadataPath = (tokenId) =>
  path.join(process.cwd(), 'public', 'metadata', `${tokenId}.json`);

export default async function handler(req, res) {
  const {
    query: { tokenId },
    body: newMetadata,
  } = req;

  if (!tokenId) {
    res.status(400).json({ error: 'Token ID is required.' });
    return;
  }

  try {
    const data = fs.readFileSync(metadataPath(tokenId), 'utf8');
    const metadata = JSON.parse(data);

    // Update the metadata
    metadata.name = newMetadata.name;
    fs.writeFileSync(metadataPath(tokenId), JSON.stringify(metadata));

    res.status(200).json({ message: 'Metadata updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating metadata file.' });
  }
}
