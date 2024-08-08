import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import UserModel from "../models/userSchema.js";
import AppointmentModel from "../models/appointmentSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !hasVisited ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form ❌", 400));
  }

  const checkDoctor = await UserModel.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (checkDoctor.length === 0) {
    return next(new ErrorHandler("Doctor Not Found ❌", 404));
  }

  if (checkDoctor.length > 1) {
    return next(
      "Doctor Conflict...!, Please Contact Through Email or Phone❌",
      404
    );
  }

  const doctorId = checkDoctor[0]._id;
  const patientId = req.user._id;

  const appointment = await AppointmentModel.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctorId,
    patientId,
    hasVisited,
    address,
  });

  res.status(200).json({
    success: true,
    error: false,
    message: "Appointment Send Successfully✅",
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const allAppointments = await AppointmentModel.find({});

  res.status(200).json({
    success: true,
    error: false,
    data: allAppointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found❌", 404));
    }

    let updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      error: false,
      message: "Appointment Status Updated✅",
      data: updatedAppointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await AppointmentModel.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found❌", 404));
  }

  await appointment.deleteOne();

  res.status(200).json({
    success: true,
    error: false,
    message: "Appointment Deleted Successfully🗑️✅",
  });
});
