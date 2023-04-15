import { getTokenById } from '../../../../lib/prisma/tokens';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const tokenId = parseInt(req.query.tokenId, 10);
      console.log('Requested tokenId:', tokenId);
      const tokenData = await getTokenById(tokenId);
      console.log('Token data from API:', tokenData); 
      if (tokenData.token) {
        res.status(200).json({ token: tokenData.token });
      } else {
        res.status(404).json({ error: 'Token not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

