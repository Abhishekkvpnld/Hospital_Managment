import MessageModel from "../models/messageSchema.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName)
      return next(new ErrorHandler("Please Enter First Name!", 400));
    if (!lastName)
      return next(new ErrorHandler("Please Enter Last Name!", 400));
    if (!email) return next(new ErrorHandler("Please Enter Email!", 400));
    if (!phone)
      return next(new ErrorHandler("Please Enter Phone Number!", 400));
    if (!message) return next(new ErrorHandler("Please Enter Message!", 400));

    await MessageModel.create({ firstName, lastName, email, phone, message });

    res.status(200).json({
      success: true,
      error: false,
      message: "Messsage Send Successfully✅",
    });
});
