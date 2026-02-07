import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking Prisma Client...');

  // Check if eventCategory exists on the client instance
  if (!prisma.eventCategory) {
    console.error('ERROR: prisma.eventCategory is UNDEFINED.');
    console.log('Available models:', Object.keys(prisma).filter(k => !k.startsWith('_')));
    process.exit(1);
  }

  console.log('SUCCESS: prisma.eventCategory exists.');

  // Try a simple query
  try {
    const count = await prisma.eventCategory.count();
    console.log(`Database connection successful. Existing categories: ${count}`);
  } catch (e) {
    console.error('Database connection failed:', e);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
