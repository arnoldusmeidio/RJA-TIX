import express from "express";
import { login, register, logout } from "../controller/auth-controller";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
