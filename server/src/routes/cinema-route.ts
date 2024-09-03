import express from "express";
import {
  createCinema,
  deleteCinema,
  getAllCinema,
  searchCinema,
  searchSingleCinema,
} from "../controller/cinema-controller";
import { adminGuard, verifyToken } from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getAllCinema).post(verifyToken, adminGuard, createCinema);
router.route("/search").get(searchCinema);
router
  .route("/search/:id")
  .get(searchSingleCinema)
  .delete(verifyToken, adminGuard, deleteCinema);

export default router;
