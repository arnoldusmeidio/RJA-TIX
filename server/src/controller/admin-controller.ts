import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestWithUserId } from "../types";
import { createAdminManagerSchema } from "../schemas/admin-manager-schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// GET METHOD --
// Get all Admin (for Super Admin only)
export async function getAllAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const admins = await prisma.admin.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({ data: admins });
  } catch (error) {
    next(error);
  }
}

// Search Admin by ID (for Super Admin only)
export async function getSingleAdminParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

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

// Search Admin by ID
export async function getSingleAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

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
// Create new Admin (for Super Admin only)
export async function createAdmin(
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

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (existingAdmin)
      return res.status(409).json({ message: "This user is already an admin" });

    await prisma.admin.create({
      data: {
        id,
      },
    });

    return res.status(201).json({ message: "Admin successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// DELETE METHOD --
// Delete Admin (for Super Admin only)
export async function deleteAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!existingAdmin)
      return res.status(404).json({ message: "Admin not found" });

    if (id === process.env.SUPER_ADMIN_ID)
      return res.status(403).json({ message: "Cannot delete Super Admin" });

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
