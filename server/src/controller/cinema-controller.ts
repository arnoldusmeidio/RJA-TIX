import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  createCinemaSchema,
  updateCinemaSchema,
} from "../schemas/cinema-schema";
import { ZodError } from "zod";
import { RequestWithUserId } from "../types";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Cinema
export async function getAllCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cinemas = await prisma.cinema.findMany({
      include: {
        studios: {
          include: { showtimes: { include: { movie: true } } },
        },
      },
    });

    return res.status(200).json({ data: cinemas });
  } catch (error) {
    next(error);
  }
}

// Get manage Cinema (Manager only)
export async function getManageCinema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

    const cinema = await prisma.cinema.findMany({
      where: { managers: { some: { id } } },
      include: {
        studios: {
          include: { showtimes: { include: { movie: true } } },
        },
      },
    });
    return res.status(200).json({ data: cinema });
  } catch (error) {
    next(error);
  }
}

// Search Cinemas with Showtime
export async function searchCinemaShowtimes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const cinema = await prisma.cinema.findMany({
      where: {
        studios: {
          some: {
            showtimes: {
              some: {
                movieId: Number(id),
                startTime: { gt: new Date(Date.now()) },
              },
            },
          },
        },
      },
      include: {
        studios: {
          include: {
            showtimes: {
              where: {
                movieId: Number(id),
                startTime: { gt: new Date(Date.now()) },
              },
            },
          },
        },
      },
    });

    if (!cinema) return res.status(404).json({ message: "Cinema not found" });

    return res.status(200).json({ data: cinema });
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
              contains: text as string,
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
    const parsedData = createCinemaSchema.parse(req.body);
    const { cinemaName, managerId, address, studios } = parsedData;

    const existingCinema = await prisma.cinema.findUnique({
      where: {
        uniqueCinema: {
          name: cinemaName,
          address,
        },
      },
    });

    if (existingCinema)
      return res.status(409).json({ message: "Cinema already exist" });

    const cinemaStudio = studios?.map((item, index) => {
      const { rows, columns } = item;
      const seats = [];

      for (let row = 1; row <= rows; row++) {
        for (let column = 1; column <= columns; column++) {
          seats.push({ row, column });
        }
      }
      return {
        number: index + 1,
        studioType: item.studioType,
        price: Number(item.price),
        seats: {
          create: seats,
        },
      };
    });

    const user = await prisma.user.findUnique({
      where: {
        id: managerId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.cinema.create({
      data: {
        name: cinemaName,
        managers: {
          connectOrCreate: {
            where: { id: managerId },
            create: { id: managerId },
          },
        },
        address,
        studios: {
          create: cinemaStudio,
        },
      },
    });

    return res.status(201).json({ message: "Cinema successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// PUT METHOD --
// Update Cinema info
export async function updateCinemaInfo(
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

    const parsedData = updateCinemaSchema.parse(req.body);
    const { cinemaName, managerId, address } = parsedData;

    const user = await prisma.user.findUnique({
      where: {
        id: managerId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.cinema.update({
      where: {
        id: Number(id),
      },
      data: {
        name: cinemaName,
        managers: {
          connectOrCreate: {
            where: { id: managerId },
            create: { id: managerId },
          },
        },
        address,
      },
    });

    return res.status(201).json({ message: "Cinema successfully updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

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
