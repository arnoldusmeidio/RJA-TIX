import express from "express";

import { managerGuard, verifyToken } from "../middlewares/auth-middleware";
import {
  createShowtime,
  searchShowtimes,
} from "../controller/showtime-controller";

const router = express.Router();

router.route("/").post(verifyToken, managerGuard, createShowtime);
router.route("/search/:id").get(verifyToken, searchShowtimes);

export default router;
