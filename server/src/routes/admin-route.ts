import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  getSingleAdmin,
  getSingleAdminParams,
} from "../controller/admin-controller";
import { superAdminGuard } from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getSingleAdmin).post(superAdminGuard, createAdmin);

router.route("/search").get(superAdminGuard, getAllAdmin);
router
  .route("/search/:id")
  .get(superAdminGuard, getSingleAdminParams)
  .delete(superAdminGuard, deleteAdmin);

export default router;
