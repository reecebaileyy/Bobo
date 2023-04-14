const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  const allMetadata = await prisma.metadatas.findMany({
    where: {
        token: {
            in: [1]
        }
    }
  })
  console.log(allMetadata)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })