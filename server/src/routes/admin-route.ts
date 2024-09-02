import express from "express";
import { getSingleAdmin } from "../controller/admin-controller";
import {
  deleteUserParams,
  getAllUser,
  getSingleUserParams,
  updateUserInfoParams,
} from "../controller/user-controller";
import {
  createManager,
  deleteManager,
  getAllManager,
  getSingleManagerParams,
} from "../controller/manager-controller";
import { createCinema, deleteCinema } from "../controller/cinema-controller";

const router = express.Router();

// Admin Info
router.route("/").get(getSingleAdmin);

// Manage Manager
router.route("/managers").get(getAllManager).post(createManager);
router.route("/managers/:id").get(getSingleManagerParams).delete(deleteManager);

// Manage Cinema
router.route("/cinema").post(createCinema);
router.route("/cinema/:id").delete(deleteCinema);

// Manage User
router.route("/users").get(getAllUser);
router
  .route("/users/:id")
  .get(getSingleUserParams)
  .put(updateUserInfoParams)
  .delete(deleteUserParams);

export default router;
