import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { logger } from '../shared/utils/logger';
import env from '../main/config/env';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  logger.info('Seeding database...');

  const hashedPassword = await bcrypt.hash(env.jwtSeedDb, 10);

  await prisma.user.upsert({
    where: { email: 'rodrigobarros@hotmail.com.com' },
    update: {},
    create: {
      email: 'rodrigobarros@hotmail.com.com',
      name: 'Rodrigo Barros',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  logger.info('Seeding completed!');
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
