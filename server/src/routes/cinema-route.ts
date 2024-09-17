import express from "express";
import {
  createCinema,
  deleteCinema,
  getAllCinema,
  getManageCinema,
  searchCinema,
  searchCinemaShowtimes,
  searchSingleCinema,
  updateCinemaInfo,
} from "../controller/cinema-controller";
import {
  adminGuard,
  managerGuard,
  verifyToken,
} from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getAllCinema).post(verifyToken, adminGuard, createCinema);
router.route("/managers").get(verifyToken, managerGuard, getManageCinema);

router.route("/search").get(searchCinema);
router.route("/search/showtimes/:id").get(searchCinemaShowtimes);
router
  .route("/search/:id")
  .get(searchSingleCinema)
  .delete(verifyToken, adminGuard, deleteCinema)
  .put(verifyToken, adminGuard, updateCinemaInfo);

export default router;
