import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const tokensMetadata = await prisma.metadatas.findMany({
        select: {
          token: true,
          metadata: true,
        },
      });

      const parsedMetadata = tokensMetadata.map((token) => ({
        id: token.token,
        name: (token.metadata as { name: string }).name, // Explicitly cast metadata type
      }));

      res.status(200).json(parsedMetadata);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      res.status(500).json({ error: "Failed to fetch metadata" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
