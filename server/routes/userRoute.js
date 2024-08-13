import express from "express";
import { addNewAdmin, addNewDoctor, adminLogout, getAllDoctors, getUserDetails, login, patientLogout, patientRegister } from "../controllers/userController.js";
import { adminAuth,patientAuth} from "../middlewares/auth.js";


const router = express.Router();

//Patient
router.post("/patient/register", patientRegister);
router.post("/login",login);
router.get("/doctors",getAllDoctors);
router.get("/patient/me",patientAuth,getUserDetails);
router.get("/patient/logout",patientAuth,patientLogout);

//Admin
router.post("/addNewDoctor")
router.post("/admin/addNew",adminAuth,addNewAdmin);
router.get("/admin/me",adminAuth,getUserDetails);
router.get("/admin/logout",adminAuth,adminLogout);
router.post("/doctor/addNew",adminAuth,addNewDoctor);

export default router;
