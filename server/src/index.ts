import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth-route";
import movieRouter from "./routes/movie-route";
import adminRouter from "./routes/admin-route";
import managerRouter from "./routes/manager-route";
import userRouter from "./routes/user-route";
import cinemaRouter from "./routes/cinema-route";
import showtimeRouter from "./routes/showtime-route";
import adminVoucherRouter from "./routes/admin-voucher-route";
import ticketRouter from "./routes/ticket-route";

import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import { error } from "./middlewares/error-middleware";

import {
  adminGuard,
  managerGuard,
  superAdminGuard,
  userGuard,
  verifyToken,
} from "./middlewares/auth-middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
);

const PORT = process.env.PORT || 8000;

// Public Route
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/cinemas", cinemaRouter);
app.use("/api/v1/showtimes", showtimeRouter);
app.use("/api/v1/vouchers", adminVoucherRouter);

// User Route
app.use("/api/v1/users", verifyToken, userRouter);
app.use("/api/v1/tickets", verifyToken, ticketRouter);

// Admin & Manager Route
app.use("/api/v1/admins", verifyToken, adminGuard, adminRouter);
app.use("/api/v1/managers", verifyToken, managerRouter);

// Auth Route
app.use("/api/v1/auth", authRouter);

// Handler
app.use(notFoundMiddleware);
app.use(error);

app.listen(PORT, () => {
  console.log("Server started and listening on port ", PORT);
});
