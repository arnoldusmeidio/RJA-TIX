import express from "express";
import { createTicket } from "../controller/ticket-controller";

const router = express.Router();

router.route("/").post(createTicket);

export default router;
