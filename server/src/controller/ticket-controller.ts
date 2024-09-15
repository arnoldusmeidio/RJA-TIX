import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { paymentSchema } from "../schemas/payment-schema";

const prisma = new PrismaClient();

// POST METHOD --
// Create new Ticket
export async function createMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = paymentSchema.parse(req.body);
    const { userId, studioId, showtimeId, seats } = parsedData;

    const ticket = await prisma.ticket.create({
      data: {
        userId,
        bookings: {
          create: seats.map((seat) => ({
            row: seat.row,
            column: seat.column,
            studioId: Number(studioId),
            showtimeId: Number(showtimeId),
            userId,
          })),
        },
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}
