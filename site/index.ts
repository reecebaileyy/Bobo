import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();

  try {
    // Create a new metadata document
    const newMetadata = await prisma.metadatas.create({
      data: {
        metadata: {
          description: "Example description",
          image: "https://bobovision.vercel.app/images/1.gif",
          name: "Example Token Name",
          attributes: [
            { trait_type: "Color", value: "Blue" },
            { trait_type: "Rarity", value: "Rare" },
          ],
        },
        token: 1, // Replace with a unique token ID
        v: 1, // Replace with the version number or any integer value
      },
    });

    console.log("New metadata created:", newMetadata);
  } catch (error) {
    console.error("Error creating metadata:", error);
  } finally {
    // Disconnect the client
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
