import { PrismaClient } from '@prisma/client';
import { USERS } from './data/users';
import { NOTIFICATION_CATEGORIES } from './data/notification_categories';

const prisma = new PrismaClient();

async function main() {
  // Seeding notification categories (Sports, Finance, Movies)
  const { sports, finance, movies } = NOTIFICATION_CATEGORIES;

  const sportsCategory = await prisma.notificationCategory.upsert({
    where: { category: sports.category },
    update: {},
    create: sports,
  });

  const financeCategory = await prisma.notificationCategory.upsert({
    where: { category: finance.category },
    update: {},
    create: finance,
  });

  const moviesCategory = await prisma.notificationCategory.upsert({
    where: { category: movies.category },
    update: {},
    create: movies,
  });

  // Seedding users (Jhon, Jane, Bob)
  for (const name in USERS) {
    const user = await prisma.user.upsert({
      where: { email: USERS[name].email },
      update: {},
      create: USERS[name],
    });

    if (user.id) {
      await prisma.userSubscription.upsert({
        where: {
          userId_categoryId: { userId: user.id, categoryId: sportsCategory.id },
        },
        update: {},
        create: {
          userId: user.id,
          categoryId: sportsCategory.id,
        },
      });

      if (name !== 'bob') {
        await prisma.userSubscription.upsert({
          where: {
            userId_categoryId: {
              userId: user.id,
              categoryId: financeCategory.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            categoryId: financeCategory.id,
          },
        });
        await prisma.userSubscription.upsert({
          where: {
            userId_categoryId: {
              userId: user.id,
              categoryId: moviesCategory.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            categoryId: moviesCategory.id,
          },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`An error ocurred while seeding the DB: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
