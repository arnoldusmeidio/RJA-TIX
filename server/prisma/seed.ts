import { PrismaClient, Prisma } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";

const prisma = new PrismaClient();

async function inputData() {
  console.log("Start seeding users...\n");

  const salt = await genSalt(10);
  const hashedPassword = await hash("password", salt);
  const userData: Prisma.UserCreateInput[] = [
    {
      id: "super-admin-000000000",
      name: "Super Momod",
      email: "momod@momod.com",
      password: hashedPassword,
      admin: {
        create: {},
      },
      manager: {
        create: {},
      },
    },
    {
      id: "admin-000000001",
      name: "Admin",
      email: "admin@admin.com",
      password: hashedPassword,
      admin: {
        create: {},
      },
    },
    {
      id: "manager-000000001",
      name: "Manager",
      email: "manager@manager.com",
      password: hashedPassword,
      manager: {
        create: {},
      },
    },
    {
      id: "user-234567890",
      name: "Roy",
      email: "roy@chen.com",
      password: hashedPassword,
    },
    {
      id: "user-345678909",
      name: "Roni",
      email: "roni@josh.com",
      password: hashedPassword,
    },
    {
      id: "user-456789098",
      name: "David",
      email: "david@chris.com",
      password: hashedPassword,
    },
  ];

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Successfully create movie with id: ${user.id}`);
  }

  console.log("\nSeeding users finished!\n");

  console.log("\nStart seeding movies...\n");

  const movieData: Prisma.MovieCreateInput[] = [
    {
      title: "Inception",
      director: "Christopher Nolan",
      genre: "SCI_FI",
      rated: "PG_13",
      duration: 148,
      releaseYear: 2010,
    },
    {
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      genre: "DRAMA",
      rated: "R",
      duration: 142,
      releaseYear: 1994,
    },
    {
      title: "The Grand Budapest Hotel",
      director: "Wes Anderson",
      genre: "COMEDY",
      rated: "R",
      duration: 99,
      releaseYear: 2014,
    },
    {
      title: "Deadpool & Wolverine",
      director: "Shawn Levy",
      genre: "ACTION",
      rated: "R",
      duration: 128,
      releaseYear: 2024,
    },
  ];

  for (const m of movieData) {
    const movie = await prisma.movie.create({
      data: m,
    });
    console.log(`Successfully create movie with title: ${movie.title}`);
  }

  console.log("\nSeeding movies finished!");
  console.log("\nSeeding COMPLETE!");
}

inputData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect;
    process.exit(1);
  });
