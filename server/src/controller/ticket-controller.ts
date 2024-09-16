import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { paymentSchema } from "../schemas/payment-schema";
import { RequestWithUserId } from "../types";

const prisma = new PrismaClient();

// POST METHOD --
// Create new Ticket
export async function createTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = (req as RequestWithUserId).user?.userId;
    if (!userId) return res.status(404).json({ message: "User not found" });

    const parsedData = paymentSchema.parse(req.body);
    const {
      studioId,
      showtimeId,
      seats,
      voucherId,
      adminVoucherId,
      points,
      totalPrice,
    } = parsedData;

    const checkedBalance = await prisma.wallet.findUnique({
      where: {
        id: userId,
      },
    });

    if (checkedBalance?.balance! < totalPrice)
      return res.status(406).json({ message: "Balance not enough" });

    let totalPointUsed = 0;
    if (points) totalPointUsed = Number(points) / 10000;

    let adminVoucherValidity = false;
    const checkadminVoucher = await prisma.adminVoucher.findUnique({
      where: {
        id: String(adminVoucherId),
        availability: { gt: 0 },
      },
    });

    if (checkadminVoucher) adminVoucherValidity = true;

    const validAdminVoucher = {
      ...(adminVoucherValidity
        ? adminVoucherId
          ? adminVoucherId !== ""
            ? {
                adminVoucher: {
                  connect: {
                    id: adminVoucherId,
                  },
                },
              }
            : {}
          : {}
        : {}),
    };

    const validVoucher = {
      ...(Number(voucherId)! > 0
        ? {
            voucher: {
              connect: [{ id: Number(voucherId) }],
            },
          }
        : {}),
    };

    // Find pointId used
    const pointsId = await prisma.point.findMany({
      take: totalPointUsed,
      where: {
        userId,
        paymentId: null,
      },
    });

    // Generating ticket and booking information
    await prisma.ticket.create({
      data: {
        userId,
        bookings: {
          create: seats.map((seat) => ({
            row: seat.row,
            column: seat.column,
            studioId: Number(studioId),
            showtimeId: Number(showtimeId),
            userId,
          })),
        },
        payment: {
          create: {
            paymentStatus: true,
            paymentDate: new Date(Date.now()),

            point: {
              connect: pointsId.map((point) => ({
                id: point.id,
              })),
            },
            wallet: {
              connect: {
                id: userId,
              },
            },
            totalPayment: totalPrice,
            ...validVoucher,
            ...validAdminVoucher,
          },
        },
      },
    });

    // Deducting Wallet
    await prisma.wallet.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          decrement: totalPrice,
        },
      },
    });

    // Deductiong AdminVoucher
    if (adminVoucherValidity && adminVoucherId && adminVoucherId !== "") {
      await prisma.adminVoucher.update({
        where: {
          id: adminVoucherId,
        },
        data: {
          availability: {
            decrement: 1,
          },
        },
      });
    }

    return res.status(200).json({ message: "Payment success" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}
