import express from "express";
import {
  createAdminVoucher,
  getAllAdminVoucher,
  searchAdminVoucher,
} from "../controller/admin-voucher-controller";
import { adminGuard } from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getAllAdminVoucher).post(createAdminVoucher);
router.route("/:id").get(searchAdminVoucher);

export default router;
