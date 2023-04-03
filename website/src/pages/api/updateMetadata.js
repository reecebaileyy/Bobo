import fs from 'fs';
import path from 'path';

const updateMetadata = (tokenId, updatedMetadata) => {
  const filePath = path.join(process.cwd(), 'public', 'metadata', `${tokenId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(updatedMetadata, null, 2));
};

export default async function handler(req, res) {
  const tokenId = req.query.tokenId;

  if (req.method === 'PUT') {
    try {
      const updatedMetadata = JSON.parse(req.body);
      updateMetadata(tokenId, updatedMetadata);
      res.status(200).json({ message: 'Metadata updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating metadata' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
