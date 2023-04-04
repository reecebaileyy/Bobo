import fs from 'fs';
import path from 'path';

const metadataDirectory = path.join(__dirname, '..', '..', '..', 'public', 'metadata');

export default async function handler(req, res) {
  const { token, newName } = req.body;

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!token || !newName) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  } else {
    console.log(token, newName)
    const metadataPath = path.join(metadataDirectory, `${token}.json`);
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    metadata.name = newName;
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    res.status(200).json({ message: 'Metadata name updated successfully' });
  }
}
