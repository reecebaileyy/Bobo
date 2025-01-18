import { prisma } from './index';

export async function getTokens() {
  try {
    const allTokens = await prisma.metadatas.findMany();
    console.log('All tokens:', allTokens);
    return { allTokens };
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return { error };
  }
}

export async function getTokenById(tokenId: number) {
  try {
    console.log('Searching for tokenId:', tokenId);
    const start = Date.now();
    const token = await prisma.metadatas.findMany({
      where: {
        token: tokenId,
      },
    });
    console.log('Found token:', token);
    console.log(`Database query took ${Date.now() - start} ms`);
    return token;
  } catch (error) {
    console.error('Error fetching token by ID:', error);
    return { error };
  }
}
