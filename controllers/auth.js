const crypto = require("crypto");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const sendEmail = require("../utils/sendEmail");
const { uploadPhoto } = require("../middlewares/uploadPhoto");

// @desc         Register user
// @route        POST /api/v1/auth/register
// @access       Public
exports.register = asyncHandler(async (req, res, next) => {
  const checkUser = User.find({ email: req.body.email });
  if ((await checkUser).length != 0) {
    return next(new ErrorResponse("User already exist", 400));
  } else {
    if(req.body.image!="avatar"){
      uploadPhoto(req, "users images", next);
    }
  }

  // create user
  const user = await User.create(req.body);

  sendtokenResponse(user, 200, res);
});

// @desc         Login user
// @route        POST /api/v1/auth/login
// @access       Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & user
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an Email and Password", 400));
  }

  //check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credential", 401));
  }

  //check if match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credential", 401));
  }

  sendtokenResponse(user, 200, res);
});

// @desc         Log user out / clear cookie
// @route        GET /api/v1/auth/logout
// @access       Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
});

// @desc         Get current Login user
// @route        POST /api/v1/auth/me
// @access       Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});

// @desc         Update user password
// @route        PUT /api/v1/auth/updatepassword
// @access       Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is inccorect", 401));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendtokenResponse(user, 200, res);
});

// @desc         Update user detail
// @route        PUT /api/v1/auth/updatedetails
// @access       Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  if (fieldsToUpdate.email === req.user.email) {
    next(new ErrorResponse(`You have entred the same old email!`));
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new ErrorResponse("This email is already taken!"));
  }


  user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// @desc         Reset password
// @route        PUT /api/v1/auth/resetpassword/:resettoken
// @access       Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resttoken)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse(`Invalid token`, 400));
  }

  //Set password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendtokenResponse(user, 200, res);
});

// @desc         Forgot password
// @route        POST /api/v1/auth/forgotpassword
// @access       Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("there's no user with that email", 404));
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `Make a PUT request to ${resetUrl} to reset your password!`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({ success: true, data: "Email sent!" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// create token from model, create cookie and send response
const sendtokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignenJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") options.secure = true;
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
