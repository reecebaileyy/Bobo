// pages/api/tokens/getAllMetadata.js
import { prisma } from 'lib/prisma/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const tokensMetadata = await prisma.metadatas.findMany({
        select: {
          metadata: true,
        },
      });

      const parsedMetadata = tokensMetadata.map((token) => token.metadata);

      res.status(200).json(parsedMetadata);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching metadata.' });
  }
}
