import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:test@localhost:5434/postgres_test?schema=public'
    }
  }
});

export default prisma;
