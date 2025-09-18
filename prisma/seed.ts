import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // TRUNCATE 명령어를 사용하여 테이블을 초기화합니다.
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "account" RESTART IDENTITY CASCADE;');

  const account1 = await prisma.account.create({
    data: {
      id: 'testuser1',
      pw: 'password123',
      playerName: 'TEST_USER_1',
      sdvxId: 'SDVX-001',
    },
  });

  const account2 = await prisma.account.create({
    data: {
      id: 'testuser2',
      pw: 'password456',
      playerName: 'TEST_USER_2',
      sdvxId: 'SDVX-002',
    },
  });

  console.log({ account1, account2 });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
