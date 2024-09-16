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

// GET METHOD --
// Search Booked showtimes
export async function searchBookedShowtimes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const showtime = await prisma.showtime.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });

    const [total, booked] = await Promise.all([
      await prisma.seat.count({
        where: {
          studioId: Number(showtime?.studioId),
        },
      }),

      await prisma.booking.count({
        where: {
          showtimeId: Number(id),
        },
      }),
    ]);

    return res.status(200).json({ data: { total, booked } });
  } catch (error) {
    next(error);
  }
}

// Search Showtime with seats info
export async function searchSeatShowtimes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const showtime = await prisma.showtime.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        studio: { include: { seats: true } },
        movie: true,
      },
    });

    if (!showtime)
      return res.status(404).json({ message: "Showtime not found" });

    const seatsWithBookingInfo = await Promise.all(
      showtime?.studio.seats.map(async (seat) => {
        const booking = await prisma.booking.findUnique({
          where: {
            uniqueSeatShowtime: {
              column: seat.column,
              row: seat.row,
              studioId: seat.studioId,
              showtimeId: Number(id),
            },
          },
        });

        return { ...seat, booked: booking?.id ? true : false };
      }) || []
    );

    return res.status(200).json({
      data: {
        studioId: showtime?.studioId,
        seats: seatsWithBookingInfo,
        price: showtime?.studio.price,
        movieId: showtime?.movieId,
        movieTitle: showtime.movie.title,
        studioType: showtime.studio.studioType,
      },
    });
  } catch (error) {
    next(error);
  }
}
