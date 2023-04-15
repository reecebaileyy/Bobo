const { prisma } = require('../../../../../lib/prisma/index');

const asyncHandler = (handler) => (req, res) =>
    handler(req, res).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });

async function updateName(req, res) {
    const { tokenId } = req.query;
    const { newName } = req.body;

    try {
        await prisma.metadatas.updateMany({
            where: {
              token: parseInt(tokenId),
            },
            data: {
              metadata: {
                update: {
                  name: newName, 
                },
              },
            },
          });

        res.status(200).json({ message: 'Name updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update name' });
    }
}

export default asyncHandler(updateName);
