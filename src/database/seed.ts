import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { logger } from '../shared/utils/logger';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  logger.info('Seeding database...');

  const hashedPassword = await bcrypt.hash('secure_password', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
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
