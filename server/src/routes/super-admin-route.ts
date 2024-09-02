import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  getSingleAdminParams,
} from "../controller/admin-controller";

const router = express.Router();

// Manage Admin
router.route("/admins").get(getAllAdmin).post(createAdmin);
router.route("/admins/:id").get(getSingleAdminParams).delete(deleteAdmin);

export default router;
