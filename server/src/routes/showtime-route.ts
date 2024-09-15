import express from "express";

import { managerGuard, verifyToken } from "../middlewares/auth-middleware";
import {
  createShowtime,
  searchBookedShowtimes,
  searchSeatShowtimes,
} from "../controller/showtime-controller";

const router = express.Router();

router.route("/").post(verifyToken, managerGuard, createShowtime);
router.route("/search/seats/:id").get(verifyToken, searchSeatShowtimes);
router.route("/search/:id").get(verifyToken, searchBookedShowtimes);

export default router;
