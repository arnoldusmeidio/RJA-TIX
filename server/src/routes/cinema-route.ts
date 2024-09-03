import express from "express";
import {
  getAllCinema,
  searchCinema,
  searchSingleCinema,
} from "../controller/cinema-controller";

const router = express.Router();

// Manager Info
router.route("/").get(getAllCinema);
router.route("/search").get(searchCinema);
router.route("/search/:id").get(searchSingleCinema);

export default router;
