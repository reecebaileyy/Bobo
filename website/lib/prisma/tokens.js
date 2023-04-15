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
  
      // Try to get the data from cache
      const cacheKey = `token-${tokenId}`;
      const cacheData = await getAsync(cacheKey);
  
      if (cacheData) {
        console.log('Found token in cache:', cacheData);
        return JSON.parse(cacheData);
      }
  
      // If not found in cache, query the database
      const token = await prisma.metadatas.findMany({
        where: {
          token: tokenId,
        },
      });
  
      console.log('Found token:', token);
  
      // Store the result in cache for future use
      await setAsync(cacheKey, JSON.stringify(token));
  
      return token;
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
