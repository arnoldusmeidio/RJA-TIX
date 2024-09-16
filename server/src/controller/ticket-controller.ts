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

    let totalPointUsed = 0;
    if (points) totalPointUsed = Number(points) / 10000;

    const validAdminVoucher = {
      ...(adminVoucherId !== ""
        ? {
            adminVoucher: {
              connect: {
                id: adminVoucherId,
              },
            },
          }
        : {}),
    };

    const validVoucher = {
      ...(voucherId! > 0
        ? {
            voucher: {
              connect: [{ id: voucherId }],
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
            ...validVoucher,
            ...validAdminVoucher,
          },
        },
      },
    });

    return res.status(200).json({ message: "Payment success" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// export async function testAPI(req: Request, res: Response, next: NextFunction) {
//   try {
//     const userId = (req as RequestWithUserId).user?.userId;
//     const points = await prisma.point.findMany({
//       take: 5,
//       where: {
//         userId,
//         paymentId: null,
//       },
//     });
//     return res.status(200).json({ data: points });
//   } catch (error) {
//     console.error(error);
//   }
// }
