import express from "express";
import {
  deleteUser,
  deleteUserParams,
  getAllUser,
  getSingleUser,
  getSingleUserParams,
  updateUserInfo,
  updateUserInfoParams,
} from "../controller/user-controller";
import { adminGuard } from "../middlewares/auth-middleware";

const router = express.Router();

router.route("/").get(getSingleUser).put(updateUserInfo).delete(deleteUser);

router.route("/search").get(adminGuard, getAllUser);
router
  .route("/search/:id")
  .get(adminGuard, getSingleUserParams)
  .put(adminGuard, updateUserInfoParams)
  .delete(adminGuard, deleteUserParams);
export default router;
