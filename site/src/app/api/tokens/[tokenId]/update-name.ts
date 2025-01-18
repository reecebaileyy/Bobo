import { prisma } from "../../../../../lib/prisma";

export default async function handler(req, res) {
  const { tokenId } = req.query;

  if (req.method === "POST") {
    try {
      const { newName } = req.body;

      if (!newName) {
        res.status(400).json({ error: "New name is required" });
        return;
      }

      const updatedMetadata = await prisma.metadatas.update({
        where: { token: parseInt(tokenId as string, 10) },
        data: {
          metadata: {
            update: { name: newName },
          },
        },
      });

      res.status(200).json({ success: true, updatedMetadata });
    } catch (error) {
      console.error("Error updating name:", error);
      res.status(500).json({ error: "Failed to update name" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
