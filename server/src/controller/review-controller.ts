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
export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as RequestWithUserId).user?.userId;
    const parsedData = reviewSchema.parse(req.body);
    const { review, star, movieId } = parsedData;

    const existingReview = await prisma.review.findUnique({
      where: {
        uniqueReview: {
          movieId,
          userId: userId as string,
        },
      },
    });

    if (existingReview)
      return res
        .status(409)
        .json({ message: "You already reviewed this movie" });

    await prisma.review.create({
      data: {
        review,
        star: Number(star),
        movieId,
        userId: userId as string,
      },
    });
    return res.status(200).json({ message: "Review created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}
