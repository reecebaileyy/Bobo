import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export default async function handler(req, res) {
  const { tokenId } = req.query;

  if (req.method === 'GET') {
    try {
      const filePath = path.join(dataDirectory, `${tokenId}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const metadata = JSON.parse(fileContent);

      res.status(200).json(metadata);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching metadata' });
    }
  } else if (req.method === 'POST') {
    try {
      const { newName } = req.body;
      const filePath = path.join(dataDirectory, `${tokenId}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const metadata = JSON.parse(fileContent);

      metadata.name = newName;

      fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));

      res.status(200).json({ message: 'Metadata updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating metadata' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
