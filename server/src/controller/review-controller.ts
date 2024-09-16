import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { RequestWithUserId } from "../types";
import { reviewSchema } from "../schemas/review-schema";

const prisma = new PrismaClient();

// GET METHOD --
// Search User Review

// POST METHOD --
// Create new Review
export async function createTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as RequestWithUserId).user?.userId;
    const parsedData = reviewSchema.parse(req.body);
    const { review, star, movieId } = parsedData;

    if (userId) {
      const existingReview = await prisma.review.findUnique({
        where: {
          uniqueReview: {
            movieId,
            userId: userId,
          },
        },
      });

      if (existingReview)
        return res
          .status(409)
          .json({ message: "You already review this movie" });

      await prisma.review.create({
        data: {
          review,
          star,
          movieId,
          userId,
        },
      });

      return res.status(200).json({ message: "Review successfully submited" });
    } else {
      return res.status(401).json({ message: "Please log in" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}
