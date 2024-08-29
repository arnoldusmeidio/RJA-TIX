import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  searchSingleAdmin,
} from "../controller/admin-controller";

const router = express.Router();

router.route("/").get(getAllAdmin).post(createAdmin).delete(deleteAdmin);
router.route("/search/admins/:id").get(searchSingleAdmin);

export default router;
