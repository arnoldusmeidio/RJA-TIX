import express from "express";
import {
  createMovie,
  deleteMovie,
  updateMovieInfo,
} from "../controller/movie-controller";

const router = express.Router();

router.route("/movies").post(createMovie);
router.route("/movies/:id").put(updateMovieInfo).delete(deleteMovie);

export default router;
