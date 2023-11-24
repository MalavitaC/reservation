import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { account: 'admin' },
    update: {},
    create: {
      account: 'admin',
      password: 'admin',
      role: 'employees',
    },
  });
  await prisma.user.upsert({
    where: { account: 'gest' },
    update: {},
    create: {
      account: 'gest',
      password: 'gest',
      role: 'gest',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
