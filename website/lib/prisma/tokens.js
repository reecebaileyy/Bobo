import prisma from ".";

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
    console.log('Searching for tokenId:', tokenId); 
    try {
        console.log("hello")
        const tokens = await prisma.metadatas.findMany({
            where: {
                token: {
                    in: [tokenId]
                }
            }
          });
        console.log("Token:", tokens)
        const token = tokens.length > 0 ? tokens[0] : null;

        return { token };
    }
    catch (error) {
        return { error };
    }
}
  