import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Authentication
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token present",
      });
    }

    const verifiedUser = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    if (!verifiedUser)
      return res.status(403).json({ message: "Invalid Token" });

    (req as any).user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
}

// Admin authorization
export async function adminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: (req as any).user.userId },
    });

    if (!admin)
      return res.status(401).json({ message: "You are not an admin" });

    next();
  } catch (error) {
    next(error);
  }
}

// Super Admin authorization
export async function superAdminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if ((req as any).user.userId !== process.env.SUPER_ADMIN_ID)
      return res.status(401).json({ message: "You do not have authorization" });

    next();
  } catch (error) {
    next(error);
  }
}

// Manager authorization
export async function managerGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const manager = await prisma.manager.findUnique({
      where: { id: (req as any).user.userId },
    });

    if (!manager)
      return res.status(401).json({ message: "You are not a manager" });

    next();
  } catch (error) {
    next(error);
  }
}
