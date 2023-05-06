const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis.prisma === undefined ? {} : { prisma: globalThis.prisma };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = {
  prisma,
};
