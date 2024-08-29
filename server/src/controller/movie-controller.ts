import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

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
  const { id } = req.params;

  try {
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

// POST METHOD --
// Create new Movie
export async function createMovie(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, director, genre, rated, duration, releaseYear } = req.body;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        uniqueMovie: {
          title,
          director,
          genre,
          releaseYear,
        },
      },
    });

    if (existingMovie)
      return res.status(409).json({ message: "Movie already exist" });

    await prisma.movie.create({
      data: {
        title,
        director,
        genre,
        rated,
        duration,
        releaseYear,
      },
    });

    return res.status(201).json({ message: "Movie successfully created" });
  } catch (error) {
    next(error);
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
    const { title, director, genre, rated, duration, releaseYear } = req.body;

    await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        director,
        genre,
        rated,
        duration,
        releaseYear,
      },
    });

    return res.status(200).json({ message: "Movie successfully updated" });
  } catch (error) {
    next(error);
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
