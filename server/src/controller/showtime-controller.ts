import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { createShowtimeSchema } from "../schemas/showtime-schema";

const prisma = new PrismaClient();

// POST METHOD --
// Create new Showtime
export async function createShowtime(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = createShowtimeSchema.parse(req.body);
    const { movieId, studioId, showtimes } = parsedData;

    const studio = await prisma.studio.findUnique({
      where: { id: studioId },
    });

    if (!studio) return res.status(404).json({ message: "Studio not found" });

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    for (let i = 0; i < showtimes.length; i++) {
      const existingShowtime = await prisma.showtime.findUnique({
        where: {
          uniqueShowtime: {
            studioId,
            startTime: new Date(showtimes[i].date.concat(showtimes[i].time)),
          },
        },
      });

      if (existingShowtime)
        return res.status(409).json({
          message: `Showtime at ${new Date(
            showtimes[i].date.concat(showtimes[i].time)
          )} already exist`,
        });
    }

    await prisma.showtime.createMany({
      data: showtimes.map((showtime) => ({
        studioId,
        movieId,
        startTime: new Date(showtime.date.concat(showtime.time)),
      })),
    });

    return res.status(201).json({ message: "Showtimes successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// Search Cinemas with Showtime
export async function searchShowtimes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const cinema = await prisma.showtime.findMany({
      where: {
        movieId: Number(id),
        startTime: { gt: new Date(Date.now()) },
      },
      include: {
        studio: { include: { cinema: true } },
      },
    });

    if (!cinema) return res.status(404).json({ message: "Cinema not found" });

    return res.status(200).json({ data: cinema });
  } catch (error) {
    next(error);
  }
}
