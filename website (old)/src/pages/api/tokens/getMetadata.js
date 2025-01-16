const { prisma } = require('lib/prisma/index');

export default async function handler(req, res) {
    const tokenId = req.query.tokenId;
  
    if (!tokenId) {
      return res.status(400).json({ error: 'Token ID is required' });
    }
  
    try {
      const metadata = await prisma.metadatas.findFirst({
        where: { token: parseInt(tokenId) },
      });
  
      if (!metadata) {
        return res.status(404).json({ error: 'Token not found' });
      }
  
      return res.status(200).json(metadata.metadata);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error fetching metadata' });
    }
  }