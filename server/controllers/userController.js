import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import UserModel from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    // nic,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    // !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let user = await UserModel.findOne({ email });

  if (user) {
    return next(
      new ErrorHandler(`${user.role} With This Email Already Registered!`, 400)
    );
  }
  user = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    // nic,
    role,
  });

  generateToken(user, "User Registered Successfully✅", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details !", 400));
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password And Confirm Password Do Not Match !", 400)
    );
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password ❌", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email And Password!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User With This Role Not Found ❌"));
  }

  generateToken(user, "User Logged In Successfully✅", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  let admin = await UserModel.findOne({ email });

  if (admin) {
    return next(
      new ErrorHandler(`${admin.role} With This Email Already Registered!`, 400)
    );
  }

  admin = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Admin",
  });

  generateToken(admin, "New Admin Registered Successfully✅", 200, res);
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const allDoctors = await UserModel.find({ role: "Doctor" });

  res.status(200).json({
    success: true,
    error: false,
    doctors: allDoctors,
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    error: false,
    data: user,
  });
});

export const adminLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", { httpOnlt: true, expires: new Date(Date.now()) })
    .json({
      success: true,
      error: false,
      message: "User Log out Successfully✅",
    });
});

export const patientLogout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      error: false,
      message: "User Log out Successfully ✅",
    });
});

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
  if (req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required ❌", 400));
  }

  const { docAvatar } = req.files;
  const allowedFormats = ["/image/png", "/image/jpeg", "/image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported ❌", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("Please Provide Full Details ❌", 400));
  }

  const isRegistered = await UserModel.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} Already Registered With this Email ❌`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.UploadStream.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error ❌"
    );
  }

  const Doctor = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    error: false,
    message: "New Doctor Registered Successfully ✅",
    data: Doctor,
  });
});
