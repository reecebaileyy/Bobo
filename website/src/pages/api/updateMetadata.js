import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { tokenId, name } = req.body;
  const { db } = await connectToDatabase();

  try {
    const result = await db.collection('metadatas').updateOne({ tokenId: tokenId.toString() }, { $set: { name } });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Metadata not found' });
    }
    res.status(200).json({ message: 'Metadata updated successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error updating metadata: ${error.message}` });
  }
}
