import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUserId } from "../types";
import { createAdminManagerSchema } from "../schemas/admin-manager-schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Manager (for Admin only)
export async function getAllManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const managers = await prisma.manager.findMany({
      where: {
        cinemaId: { not: null },
      },

      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        cinema: {
          select: { name: true },
        },
      },
    });

    return res.status(200).json({ data: managers });
  } catch (error) {
    next(error);
  }
}

// Search Manager by ID (for Admin only)
export async function getSingleManagerParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const manager = await prisma.manager.findUnique({
      where: {
        id,
      },
    });

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    return res.status(200).json({ data: manager });
  } catch (error) {
    next(error);
  }
}

// Search Manager by ID
export async function getSingleManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

    const manager = await prisma.manager.findUnique({
      where: {
        id,
      },
    });

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    return res.status(200).json({ data: manager });
  } catch (error) {
    next(error);
  }
}

// POST METHOD --
// Create new Manager (for Admin only)
export async function createManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = createAdminManagerSchema.parse(req.body);
    const { id } = parsedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const existingManager = await prisma.manager.findUnique({
      where: {
        id,
      },
    });

    if (existingManager)
      return res
        .status(409)
        .json({ message: "This user is already a manager" });

    await prisma.manager.create({
      data: {
        id,
      },
    });

    return res.status(201).json({ message: "Manager successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// DELETE METHOD --
// Delete Manager (for Admin only)
export async function deleteManager(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingManager = await prisma.manager.findUnique({
      where: {
        id,
      },
    });

    if (!existingManager)
      return res.status(404).json({ message: "Manager not found" });

    if (id === process.env.SUPER_ADMIN_ID)
      return res.status(403).json({ message: "Cannot delete Super Admin" });

    await prisma.manager.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Manager deleted" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}
