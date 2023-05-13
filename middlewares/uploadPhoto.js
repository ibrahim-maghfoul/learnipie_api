const mongoose = require("mongoose");
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const sharp = require("sharp"); 

// Form submition with photo
exports.uploadPhoto = (req, folderPath, next) => {
  if (!req.files) {
    return next(new ErrorResponse("Please Upload a file", 400));
  }

  const file = req.files.image;
  const extention = file.name.split(".").at(-1);

  if (extention !== "png" && extention !== "jpg" && extention !== "jpeg") {
    return next(new ErrorResponse("Please Upload an image file", 400));
  }

  //Check image size
  if (file.size > process.env.MAX_PHOTO_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image file less than ${process.env.MAX_PHOTO_FILE_UPLOAD}`,
        400
      )
    );
  }

  //Create custom filename
  let id;
  if (!req.params.id) {
    id = mongoose.Types.ObjectId();
  } else {
    id = req.params.id;
  }
  file.name = `photo_${id}${path.parse(file.name).ext}`;
  var dirHeigh = `${process.env.IMAGES_PATH}/${folderPath}/heigh resolution images`;
  var dirLow = `${process.env.IMAGES_PATH}/${folderPath}`;

  if (!fs.existsSync(dirHeigh)) {
    fs.mkdirSync(dirHeigh, { recursive: true });
  }
  if (!fs.existsSync(dirLow)) {
    fs.mkdirSync(dirLow, { recursive: true });
  }


  file.mv(
    `${dirHeigh}/${file.name}`,
    async (err) => {
      if (err) {
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
    }
  );
  
   // Use Sharp to resize the image
   sharp(file.data)
   .resize({ width: 500 }) // Set the width of the low-resolution image
   .toFile(`${dirLow}/${file.name}`, (err) => {
     if (err) {
      console.log(err)
       return next(new ErrorResponse(`Problem with file upload`, 500));
     }
   });
  req.body = {
    _id: id,
    ...req.body,
    image: file.name,
  };
};
