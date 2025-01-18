import { prisma } from "../../../../lib/prisma";

export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id: number; name: string; }[] | { error: string }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
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
        name: token.metadata.name,
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
