// Check if the user is authenticated or not

import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);

  req.user = await User.findById(decoded.id);
  next();
});
