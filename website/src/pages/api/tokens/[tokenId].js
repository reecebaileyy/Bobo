import { getTokenById } from 'lib/prisma/tokens';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const tokenId = parseInt(req.query.tokenId, 10);
    try {
      console.log('Requested tokenId:', tokenId);
      const tokenData = await getTokenById(tokenId);
      console.log('Token data from API:', tokenData);
      if (tokenData.metadata) {
        res.status(200).json(tokenData.metadata);
      } else {
        res.status(404).json({ error: 'Token not found', tokenId: tokenId, tokenData: tokenData });
      }
    } catch (error) {
      res.status(500).json({ error: error.message, tokenId: tokenId });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
