import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovie,
  searchMovie,
  searchSingleMovie,
  updateMovieInfo,
} from "../controller/movie-controller";
import { managerGuard, verifyToken } from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getAllMovie).post(verifyToken, managerGuard, createMovie);
router.route("/search").get(searchMovie);
router
  .route("/search/:id")
  .get(searchSingleMovie)
  .put(verifyToken, managerGuard, updateMovieInfo)
  .delete(verifyToken, managerGuard, deleteMovie);

export default router;
