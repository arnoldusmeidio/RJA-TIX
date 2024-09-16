import express from "express";
import { searchAdminVoucher } from "../controller/admin-voucher-controller";

const router = express.Router();

router.route("/:id").get(searchAdminVoucher);

export default router;
