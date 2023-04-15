import { getTokenById } from 'lib/prisma/tokens';

export default async function handler(req, res) {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  if (req.method === 'GET') {
    try {
      const tokenId = parseInt(req.query.tokenId, 10);
      console.log('Requested tokenId:', tokenId);
      const tokenData = await getTokenById(tokenId);
      console.log('Token data from API:', tokenData);
      if (tokenData.length > 0) {
        res.status(200).json(tokenData[0].metadata);
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
