import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import UserModel from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

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
    return next(new ErrorHandler(`${user.role} With This Email Already Registered!`, 400));
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
    return next(new ErrorHandler(`${admin.role} With This Email Already Registered!`, 400));
  }

  admin = await UserModel.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role:"Admin"
  });

  generateToken(admin, "New Admin Registered Successfully✅", 200, res);
});
