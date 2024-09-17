import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovie,
  movieWithReview,
  searchMovie,
  searchSingleMovie,
  updateMovieInfo,
} from "../controller/movie-controller";
import { adminGuard, verifyToken } from "../middlewares/auth-middleware";
import { uploader } from "../middlewares/uploader-middleware";
import { createReview } from "../controller/review-controller";

const router = express.Router();
const upload = uploader();

router
  .route("/")
  .get(getAllMovie)
  .post(verifyToken, adminGuard, upload.single("image"), createMovie);
router.route("/search").get(searchMovie);
router
  .route("/reviews")
  .get(verifyToken, movieWithReview)
  .post(verifyToken, createReview);
router
  .route("/search/:id")
  .get(searchSingleMovie)
  .put(verifyToken, adminGuard, upload.single("image"), updateMovieInfo)
  .delete(verifyToken, adminGuard, deleteMovie);

export default router;
