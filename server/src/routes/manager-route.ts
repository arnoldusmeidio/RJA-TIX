import express from "express";
import {
  createMovie,
  deleteMovie,
  updateMovieInfo,
} from "../controller/movie-controller";
import { getSingleManager } from "../controller/manager-controller";

const router = express.Router();

// Manager Info
router.route("/").get(getSingleManager);

// Manage Movie
router.route("/movies").post(createMovie);
router.route("/movies/:id").put(updateMovieInfo).delete(deleteMovie);

export default router;
