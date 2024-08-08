const {PrismaClient} = require('@prisma/client');
const  { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const main = async () => {
    await prisma.$connect();
    console.log("Creating users");
    const [user1, user2, user3] = await Promise.all(
        [...Array(3)].map(() => {
            return prisma.users.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                },
            });
        })
    );

    const users = await prisma.users.findMany();
    console.log("Created users:", users);

    console.log("Creating Items:");
    const [item1, item2, item3] = await Promise.all(
        [...Array(3)].map(() => prisma.items.create({
            data: {
                name: faker.company.name(),
                description: faker.lorem.sentences({min: 1, max: 3}),
            }
        }))
    );

    const items = await prisma.items.findMany();
    console.log("Created Items", items);
  
   
    console.log("Creating reviews");
    const [review1, review2, review3] = await Promise.all(
      [...Array(3)].map((_,i) => {
          return prisma.reviews.create({
            data: {
              score: faker.number.float({ min: 1, max: 5 }),
              txt: faker.lorem.sentences({ min: 2, max: 5 }),
              item_id: items[i].id,
              user_id: users[i].id,
            },
          
        });
        })
    );

    const reviews = await prisma.reviews.findMany();
    console.log("created reviews:", reviews);

    console.log("Creating comments");
    const [comment1, comment2, comment3] = await Promise.all(
        [...Array(3)].map((_,i) => prisma.comments.create({
            data: {
                comment: faker.lorem.sentences({min: 1, max: 3}),
                author_id: users[i].id,
                review_id: reviews[i].id,
            },
        })
        )
    )

    const comments = await prisma.comments.findMany();
    console.log("Created comments:", comments);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(`ERROR ${err}`);
    await prisma.$disconnect();
  });