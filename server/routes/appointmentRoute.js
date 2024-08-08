import express from "express";
import {patientAuth} from "../middlewares/auth.js";
import { postAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/post-appointment",patientAuth,postAppointment);

export default router;