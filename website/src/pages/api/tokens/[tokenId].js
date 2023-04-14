import { getTokenById } from '../../../../lib/prisma/tokens';

export default async function handler(req, res) {
  const { tokenId } = req.query;
  console.log('Requested tokenId:', tokenId);
  if (req.method === 'GET') {
    try {
      const { token } = await getTokenById(parseInt(tokenId, 10));
      console.log('Token from API:', token); 
      res.status(200).json({token});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
