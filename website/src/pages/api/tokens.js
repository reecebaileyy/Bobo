import { getTokens } from '../../../lib/prisma/tokens';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { allTokens } = await getTokens();
      res.json(allTokens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
