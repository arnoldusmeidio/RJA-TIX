import express from "express";
import {
  createCinema,
  deleteCinema,
  getAllCinema,
  getManageCinema,
  searchCinema,
  searchSingleCinema,
  updateCinemaInfo,
} from "../controller/cinema-controller";
import {
  adminGuard,
  managerGuard,
  verifyToken,
} from "../middlewares/auth-middleware";
import { createShowtime } from "../controller/showtime-controller";

const router = express.Router();

router.route("/").get(getAllCinema).post(verifyToken, adminGuard, createCinema);
router.route("/managers").get(verifyToken, managerGuard, getManageCinema);
router
  .route("/managers/showtimes")
  .post(verifyToken, managerGuard, createShowtime);

router.route("/search").get(searchCinema);
router
  .route("/search/:id")
  .get(searchSingleCinema)
  .delete(verifyToken, adminGuard, deleteCinema)
  .put(verifyToken, adminGuard, updateCinemaInfo);

export default router;
