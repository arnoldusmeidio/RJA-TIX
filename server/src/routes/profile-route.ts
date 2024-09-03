import express from "express";
import {
  deleteUser,
  getSingleUser,
  updateUserInfo,
} from "../controller/user-controller";

const router = express.Router();

// Managing Profile
router.route("/").get(getSingleUser).put(updateUserInfo).delete(deleteUser);

export default router;
