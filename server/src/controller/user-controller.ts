import { Request, Response, NextFunction } from "express";
import { Point, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { RequestWithUserId } from "../types";
import { updateUserSchema } from "../schemas/user-schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// GET METHOD
// Get all User (for Admin only)
export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

// Search User by ID (for Admin only)
export async function getSingleUserParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}

// Search User by ID
export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        manager: true,
        admin: true,
        wallet: true,
        vouchers: {
          where: {
            paymentId: null,
            expiredAt: { gt: new Date(Date.now()) },
          },
        },
        tickets: {
          include: {
            bookings: {
              include: {
                showtime: {
                  include: {
                    studio: {
                      include: {
                        cinema: true,
                      },
                    },
                    movie: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const points = await prisma.point.findMany({
      where: {
        userId: id,
        paymentId: null,
        expiredAt: { gt: new Date(Date.now()) },
      },
    });

    const totalPoints = points.reduce((acc, currVal: Point) => {
      return acc + currVal.points;
    }, 0);

    return res.status(200).json({ data: { ...user, totalPoints } });
  } catch (error) {
    next(error);
  }
}

// PUT METHOD
// Update User info (for Admin only)
export async function updateUserInfoParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const parsedData = updateUserSchema.parse(req.body);

    const { name, email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User not found",
      });

    let salt: string | undefined;
    let hashedPassword: string | undefined;

    if (password) {
      salt = await genSalt(10);
      hashedPassword = await hash(password, salt);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// Update User info
export async function updateUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

    const parsedData = updateUserSchema.parse(req.body);

    const { name, email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User not found",
      });

    let salt: string | undefined;
    let hashedPassword: string | undefined;

    if (password) {
      salt = await genSalt(10);
      hashedPassword = await hash(password, salt);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "User successfully updated" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// DELETE METHOD --
// Delete User (for Admin only)
export async function deleteUserParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User not found",
      });

    if (id === process.env.SUPER_ADMIN_ID)
      return res.status(403).json({ message: "Cannot delete Super Admin" });

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = (req as RequestWithUserId).user?.userId;

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser)
      return res.status(404).json({
        message: "User not found",
      });

    if (id === process.env.SUPER_ADMIN_ID)
      return res.status(403).json({ message: "Cannot delete Super Admin" });

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}
