import express from "express";
import { adminAuth, patientAuth } from "../middlewares/auth.js";
import {
  countAppointment,
    deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/post-appointment", patientAuth, postAppointment);
router.get("/all-appointments", adminAuth, getAllAppointments);
router.put("/update-status/:id",adminAuth,updateAppointmentStatus);
router.delete("/delete-appointment/:id",adminAuth,deleteAppointment);
router.get("/count-appointment",adminAuth,countAppointment);

export default router;
