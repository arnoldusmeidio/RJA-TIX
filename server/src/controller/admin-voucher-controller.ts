import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// GET METHOD --
// Search Admin Voucher by ID
export async function searchAdminVoucher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const adminVoucher = await prisma.adminVoucher.findUnique({
      where: {
        id,
        expiredAt: { gt: new Date(Date.now()) },
        availability: { gt: 1 },
      },
    });

    if (!adminVoucher)
      return res.status(404).json({ message: "Voucher not found" });

    return res.status(200).json({ data: adminVoucher });
  } catch (error) {
    next(error);
  }
}

export async function getAllAdminVoucher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vouchers = await prisma.adminVoucher.findMany({
      where: {
        expiredAt: { gt: new Date(Date.now()) },
        availability: { gt: 1 },
      },
    });

    return res.status(200).json({
      data: vouchers,
    });
  } catch (error) {
    next(error);
  }
}
