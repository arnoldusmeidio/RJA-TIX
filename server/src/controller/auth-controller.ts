import e, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// Register user
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsedData = registerSchema.parse(req.body);
    const { name, email, referralCode, password } = parsedData;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser)
      return res.status(409).json({ message: "Email has already been used" });

    if (referralCode) {
      const checkReferral = await prisma.referral.findUnique({
        where: {
          id: referralCode,
        },
      });

      if (!checkReferral) {
        return res.status(404).json({ message: "Invalid referral code" });
      } else {
        await prisma.point.create({
          data: {
            userId: referralCode,
            expiredAt: new Date(
              Date.now() + 1000 * 60 * 60 * 24 * 90
            ).toISOString(),
          },
        });
      }
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const uniqueId = `user-${Date.now().toString().slice(-9)}`;

    await prisma.user.create({
      data: {
        id: uniqueId,
        name,
        email,
        password: hashedPassword,
        referral: {
          create: {},
        },
        wallet: {
          create: {},
        },
      },
    });

    if (referralCode) {
      await prisma.voucher.create({
        data: {
          userId: uniqueId,
          referralId: referralCode,
          discount: 10,
          expiredAt: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 90
          ).toISOString(),
        },
      });
    }

    return res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// Login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password, rememberMe } = parsedData;

    const user = await prisma.user.findUnique({
      where: { email },
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
      return res.status(404).json({ message: "Invalid Email / Password" });

    const isValidPassword = await compare(password, user?.password!);

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid Email / Password" });

    let role = "";

    if (user.admin !== null && user.manager !== null) {
      role = "super-admin";
    } else if (user.admin !== null) {
      role = "admin";
    } else if (user.manager !== null) {
      role = "manager";
    } else {
      role = "user";
    }

    const jwtPayload = { email, userId: user?.id, role };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: rememberMe ? "30d" : "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: rememberMe
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
          : new Date(Date.now() + 1000 * 60 * 60 * 24),
        sameSite: "none", // need to change on production to be true
        secure: true, // turn off while check on thunderclient
      })
      .status(200)
      .json({ message: "Login success", data: user });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      next(error);
    }
  }
}

// Logout
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    next(error);
  }
}
