const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateImageUrls() {
  const oldBaseURL = 'https://www.bobovision.xyz';
  const newBaseURL = 'https://www.bobo.vision';

  const allMetadata = await prisma.metadatas.findMany();

  console.log('Fetched metadata:', allMetadata);

  for (const metadataRecord of allMetadata) {
    const metadata = metadataRecord.metadata;
    console.log(`Processing metadata for ${metadata.name}:`, metadata);

    if (metadata.image && metadata.image.startsWith(oldBaseURL)) {
      const newImageUrl = metadata.image.replace(oldBaseURL, newBaseURL);
      await prisma.metadatas.update({
        where: { id: metadataRecord.id },
        data: { metadata: { ...metadata, image: newImageUrl } },
      });
      console.log(`Updated image URL for ${metadata.name}: ${newImageUrl}`);
    } else {
      console.log(`No update needed for ${metadata.name}`);
    }
  }
}


updateImageUrls()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
