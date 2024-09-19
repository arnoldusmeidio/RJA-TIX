import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { voucherSchema } from "../schemas/admin-voucher-schema";

const prisma = new PrismaClient();

// POST METHOD --
// Create Voucher
export async function createAdminVoucher(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = voucherSchema.parse(req.body);
    const { voucherId, discount, availability, expiredAt } = parsedData;

    const existingVoucher = await prisma.adminVoucher.findUnique({
      where: {
        id: voucherId,
      },
    });

    if (existingVoucher)
      return res.status(409).json({ message: "Voucher already exists" });

    await prisma.adminVoucher.create({
      data: {
        id: voucherId,
        discount: Number(discount),
        availability: Number(availability),
        expiredAt: new Date(expiredAt),
      },
    });

    return res.status(200).json({
      message: "Voucher successfully created",
    });
  } catch (error) {
    next(error);
  }
}

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
