const sharp = require("sharp");
const path = require("path");
const asyncHandler = require("../middlewares/async");


// @desc         Get single course
// @route        GET /api/v1/uploads/images/scholarships/:image/:width
// @access       Public
exports.sharpImages = asyncHandler(async (req, res, next) => {
  const width = req.params.width;
  if (width) {
    const imagePath = path.join(
      __dirname,
   
      `../${process.env.IMAGES_PATH}/scholarships/`,
      req.params.image
    );
    sharp(imagePath) // Use Sharp library to resize the image
      .resize(Number(width))
      .toBuffer()
      .then((data) => {
        res.set("Content-Type", "image/jpeg"); // Set the content type to JPEG
        res.send(data);
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});
