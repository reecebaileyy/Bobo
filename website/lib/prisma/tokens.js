const { prisma } = require('./index');
const { getAsync, setAsync } = require('../redis');

export async function getTokens() {
    try {
        const allTokens = await prisma.metadatas.findMany();
        console.log("All tokens:", allTokens)
        return { allTokens };
    }
    catch (error) {
        return { error };
    }
}


export async function getTokenById(tokenId) {
    try {
        console.log('Searching for tokenId:', tokenId);
        const token = await prisma.metadatas.findMany({
            where: {
                token: tokenId,
            },
        });
        console.log('Found token:', token);
        return token;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

