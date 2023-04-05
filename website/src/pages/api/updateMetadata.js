const dbConnect = require('../../../lib/dbConnect').default;
const Metadata = require('../../../models/Metadata');

const metadataDirectory = path.join(process.cwd(), 'public', 'metadata');

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
    try {
      await dbConnect();

      const metadata = await Metadata.findOne({ token: Number(token) });

      if (!metadata) {
        res.status(404).json({ message: 'Metadata not found' });
        return;
      }

      metadata.metadata.name = newName;
      await metadata.save();

      res.status(200).json({ message: 'Metadata name updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = { default: handler };
