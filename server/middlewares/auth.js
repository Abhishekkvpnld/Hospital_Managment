import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";

export const adminAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin Not Authenticated🔐", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await UserModel.findById(decoded.id);

  if (req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user.role} Not Authorized🔐`, 403));
  }

  next();
});

export const patientAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.patientToken;

  if (!token) {
    return next(new ErrorHandler("Patient Not Authenticated🔐", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await UserModel.findById(decoded.id);

  if (req.user.role !== "Patient") {
    return next(new ErrorHandler(`${req.user.role} Not Authorized🔐`));
  }

  next();
});

