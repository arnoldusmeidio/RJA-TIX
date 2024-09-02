import { Request, Response, NextFunction } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import { AuthenticatedUser, RequestWithUserId } from "../types";

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
      process.env.JWT_SECRET_KEY as Secret
    );

    if (!verifiedUser)
      return res.status(403).json({ message: "Invalid Token" });

    if (typeof verifiedUser !== "string") {
      (req as RequestWithUserId).user = verifiedUser as AuthenticatedUser;
    }

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
      where: { id: (req as RequestWithUserId).user?.userId },
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
    if ((req as RequestWithUserId).user?.userId !== process.env.SUPER_ADMIN_ID)
      return res.status(401).json({ message: "You are not authorized" });

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
      where: { id: (req as RequestWithUserId).user?.userId },
    });

    if (!manager)
      return res.status(401).json({ message: "You are not a manager" });

    next();
  } catch (error) {
    next(error);
  }
}

// User authorization
export async function userGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isManager = await prisma.admin.findUnique({
      where: { id: (req as RequestWithUserId).user?.userId },
    });

    const isAdmin = await prisma.admin.findUnique({
      where: { id: (req as RequestWithUserId).user?.userId },
    });

    if (isManager || isAdmin)
      return res.status(401).json({ message: "You are not authorized" });

    next();
  } catch (error) {
    next(error);
  }
}
