import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Admin
export async function getAllAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const admins = await prisma.admin.findMany();

    return res.status(200).json({ data: admins });
  } catch (error) {
    next(error);
  }
}

// Search Admin by ID
export async function searchSingleAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    return res.status(200).json({ data: admin });
  } catch (error) {
    next(error);
  }
}

// POST METHOD --
// Create new Admin
export async function createAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (existingAdmin)
      return res.status(409).json({ message: "This user already an admin" });

    await prisma.admin.create({
      data: {
        id,
      },
    });

    return res.status(201).json({ message: "Admin successfully created" });
  } catch (error) {
    next(error);
  }
}

// DELETE METHOD --
// Delete Admin
export async function deleteAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    await prisma.admin.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Admin deleted" });
  } catch (error) {
    next(error);
  }
}
