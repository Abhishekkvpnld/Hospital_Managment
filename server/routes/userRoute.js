import express from "express";
import { addNewAdmin, getAllDoctors, getUserDetails, login, patientRegister } from "../controllers/userController.js";
import { adminAuth,patientAuth} from "../middlewares/auth.js";

const router = express.Router();

//Patient
router.post("/patient/register", patientRegister);
router.post("/login",login);
router.get("/doctors",getAllDoctors);
router.get("/patient/me",patientAuth,getUserDetails);

//Admin
router.post("/admin/addNew",adminAuth,addNewAdmin);
router.get("/admin/me",adminAuth,getUserDetails);

export default router;
