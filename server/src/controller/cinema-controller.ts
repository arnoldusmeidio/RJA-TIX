import { Request, Response, NextFunction } from "express";
import {
  Prisma,
  PrismaClient,
  ProjectionType,
  SoundSystemType,
} from "@prisma/client";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Cinema
export async function getAllCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cinemas = await prisma.cinema.findMany();

    return res.status(200).json({ data: cinemas });
  } catch (error) {
    next(error);
  }
}

// Search Cinema by ID
export async function searchSingleCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const cinema = await prisma.cinema.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        studios: { include: { showtimes: { include: { movie: true } } } },
        address: true,
      },
    });

    if (!cinema) return res.status(404).json({ message: "Cinema not found" });

    return res.status(200).json({ data: cinema });
  } catch (error) {
    next(error);
  }
}

// Search Cinema by Query
export async function searchCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text } = req.query;

    const cinemas = await prisma.cinema.findMany({
      where: {
        OR: [
          {
            name: {
              contains: text as string,
            },
          },
          {
            address: {
              address: {
                contains: text as string,
              },
            },
          },
        ],
      },
    });

    return res.status(200).json({ data: cinemas });
  } catch (error) {
    next(error);
  }
}

// POST METHOD --
// Create new Cinema
export async function createCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, managerId, address, studios } = req.body;

    const cinemaStudio = studios?.map((item: Prisma.StudioCreateInput) => {
      return {
        number: item.number,
        projectionType: item.projectionType,
        soundSystemType: item.soundSystemType,
        price: Number(item.price),
        seats: {
          create: item.seats,
        },
      };
    });

    await prisma.cinema.create({
      data: {
        name,
        managers: {
          connectOrCreate: {
            where: { id: managerId },
            create: { id: managerId },
          },
        },
        address: {
          create: {
            address: address.address,
            lat: address.lat,
            lng: address.lng,
          },
        },
        studios: {
          create: cinemaStudio,
        },
      },
    });

    return res.status(201).json({ message: "Cinema successfully created" });
  } catch (error) {
    next(error);
  }
}

// PUT METHOD --
// Update Movie info
// export async function updateMovieInfo(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { id } = req.params;

//     const { title, director, genre, rated, duration, releaseYear } = req.body;

//     await prisma.movie.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         title,
//         director,
//         genre,
//         rated,
//         duration,
//         releaseYear,
//       },
//     });

//     return res.status(200).json({ message: "Movie successfully updated" });
//   } catch (error) {
//     next(error);
//   }
// }

// DELETE METHOD --
// Delete Cinema
export async function deleteCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingCinema = await prisma.cinema.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCinema)
      return res.status(404).json({ message: "Cinema not found" });

    await prisma.cinema.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Cinema deleted" });
  } catch (error) {
    next(error);
  }
}
