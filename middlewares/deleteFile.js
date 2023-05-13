const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const asyncHandler = require("../middlewares/async");

// Delete file
exports.deleteFile = asyncHandler(async (filePath, next) => {
    if (!fs.existsSync(filePath)) {
      // File does not exist
      return next(new ErrorResponse(`File not found at path: ${filePath}`, 404));
    }
  
    // Attempt to delete the file
    fs.unlink(filePath, (err) => {
      if (err) {
        // Error deleting file
        return next(new ErrorResponse(`Error deleting file: ${err.message}`, 500));
      }
    });
    next()
  });
