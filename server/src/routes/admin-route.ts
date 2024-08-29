import express from "express";
import {
  createAdmin,
  getAllAdmin,
  searchSingleAdmin,
} from "../controller/admin-controller";

const router = express.Router();

// router.route("/").get(getAllAdmin).post(createAdmin);
// router.route("/search/admins/:id").get(searchSingleAdmin);

export default router;
