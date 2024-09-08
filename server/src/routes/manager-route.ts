import express from "express";
import {
  createManager,
  deleteManager,
  getAllManager,
  getSingleManager,
  getSingleManagerParams,
} from "../controller/manager-controller";
import { adminGuard, managerGuard } from "../middlewares/auth-middleware";

const router = express.Router();

router
  .route("/")
  .get(managerGuard, getSingleManager)
  .post(adminGuard, createManager);

router.route("/search").get(adminGuard, getAllManager);
router
  .route("/search/:id")
  .get(adminGuard, getSingleManagerParams)
  .delete(adminGuard, deleteManager);

export default router;
