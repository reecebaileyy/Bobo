import dbConnect from '../../../lib/dbConnect';
import Metadata from '../../../models/Metadata';

export default async function handler(req, res) {
  const { token } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!token) {
    res.status(400).json({ message: 'Missing token' });
    return;
  } else {
    try {
      await dbConnect();

      const metadata = await Metadata.findOne({ token: Number(token) });

      if (!metadata) {
        res.status(404).json({ message: 'Metadata not found' });
        return;
      }

      res.status(200).json(metadata.metadata);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
