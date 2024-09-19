import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createMovieSchema } from "../schemas/movie-schema";
import cloudinary from "../config/cloudinary";
import fs from "fs/promises";
import { ZodError } from "zod";
import { RequestWithUserId } from "../types";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Movie
export async function getAllMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movies = await prisma.movie.findMany();

    return res.status(200).json({ data: movies });
  } catch (error) {
    next(error);
  }
}

// Search Movie by ID
export async function searchSingleMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    return res.status(200).json({ data: movie });
  } catch (error) {
    next(error);
  }
}

// Search Movie by Query
export async function searchMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { text } = req.query;
    if (text?.length === 0) {
      return res.status(404).json({ message: "Movies not found" });
    }

    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: text as string,
            },
          },
          {
            director: {
              contains: text as string,
            },
          },
        ],
      },
    });

    return res.status(200).json({ data: movies });
  } catch (error) {
    next(error);
  }
}

// Search Movie with review
export async function movieWithReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as RequestWithUserId).user?.userId;

    const movies = await prisma.movie.findMany({
      where: {
        showtimes: {
          some: {
            bookings: {
              some: {
                userId,
              },
            },
          },
        },
      },
      include: {
        reviews: {
          where: {
            userId,
          },
        },
      },
      distinct: ["title"],
    });

    if (!movies) return res.status(404).json({ message: "Movies not found" });

    return res.status(200).json({ data: movies });
  } catch (error) {
    next(error);
  }
}

// POST METHOD --
// Create new Movie
export async function createMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = createMovieSchema.parse(req.body);
    const { title, director, genre, rated, duration, releaseYear, synopsis } =
      parsedData;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        uniqueMovie: {
          title,
          director,
          genre,
          releaseYear: Number(releaseYear),
        },
      },
    });

    if (existingMovie)
      return res.status(409).json({ message: "Movie already exist" });

    let posterUrl =
      "https://res.cloudinary.com/dbu0u9bln/image/upload/v1726041142/Default_Movie_Poster_tcqcya.jpg";

    if (req.file) {
      const cloudinaryData = await cloudinary.uploader.upload(
        req!.file!.path!,
        {
          folder: "images",
        }
      );
      posterUrl = cloudinaryData.secure_url;
      fs.unlink(req!.file!.path!);
    }

    await prisma.movie.create({
      data: {
        title,
        director,
        genre,
        rated,
        duration: Number(duration),
        releaseYear: Number(releaseYear),
        posterUrl,
        synopsis,
      },
    });

    return res.status(201).json({ message: "Movie successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// PUT METHOD --
// Update Movie info
export async function updateMovieInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingMovie)
      return res.status(404).json({ message: "Movie not found" });

    const parsedData = createMovieSchema.parse(req.body);
    const { title, director, genre, rated, duration, releaseYear, synopsis } =
      parsedData;

    let posterUrl = existingMovie.posterUrl;

    if (req.file) {
      const cloudinaryData = await cloudinary.uploader.upload(
        req!.file!.path!,
        {
          folder: "images",
        }
      );
      posterUrl = cloudinaryData.secure_url;
      fs.unlink(req!.file!.path!);
    }

    await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        director,
        genre,
        rated,
        duration: Number(duration),
        releaseYear: Number(releaseYear),
        posterUrl,
        synopsis,
      },
    });

    return res.status(201).json({ message: "Movie successfully updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// DELETE METHOD --
// Delete movie
export async function deleteMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingMovie)
      return res.status(404).json({ message: "Movie not found" });

    await prisma.movie.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    next(error);
  }
}
