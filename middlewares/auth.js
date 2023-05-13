const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Learnipie")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  //Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is unauthorize to access this route`,
          403
        )
      );
    }
    next();
  };
};

exports.verifyApiKey = asyncHandler(async (req, res, next) => {
  let apiKey;
  if (
   req.headers["app-api-key"] &&
   req.headers["app-api-key"].startsWith("Learnipie")
  ) {
    apiKey =req.headers["app-api-key"].split(" ")[1];
  } else if (req.cookies.apiKey) {
    apiKey = req.cookies.apiKey;
  }

  

  if (!apiKey) {
    return next(new ErrorResponse("API key is missing", 401));
  }

  try {
    const decoded = jwt.verify(apiKey, process.env.JWT_SECRET,{ algorithms: ['HS256'] });
    req.apiKey = decoded;
    next();
  } catch (error) {
    return next(new ErrorResponse("Invalid API key", 401));
  }
});

