const mongoose = require("mongoose");
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const asyncHandler = require("../middlewares/async");
const { PDFDocument, degrees } = require("pdf-lib");

// Form submition with photo
exports.uploadPdf = asyncHandler(async (req, folderPath, next) => {
  if (!req.files) {
    return next(new ErrorResponse("Please Upload a file", 400));
  }

  const file = req.files.file;

  const extention = file.name.split(".").at(-1);

  if (extention !== "pdf") {
    return next(new ErrorResponse("Please Upload an pdf file", 400));
  }

  //Check image size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload an image file less than ${process.env.MAX_PDF_FILE_UPLOAD}`,
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
  file.name = `document_${id}${path.parse(file.name).ext}`;

  var dir = `${process.env.DOCUMENTS_PATH}/${folderPath}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  pdfFile = `${dir}/${file.name}`;

  await file.mv(pdfFile, async (err) => {
    if (err) {
      return next(new ErrorResponse(`Problem with file upload`, 500));
    } else {
      // load pdf
      const document = await PDFDocument.load(fs.readFileSync(pdfFile));
      const pages = document.getPages();
      const numberOfPages = pages.length;

      // image watermark
      if (pdfFile) {
        // load image
        const emblemImageBytes = fs.readFileSync(
          `${process.env.IMAGES_PATH}/logo/watermark.png`
        );
        const image = await document.embedPng(emblemImageBytes);
        const pngDims = image.scale(0.1);

        // loop throgh all pages
        for (let i = 0; i < numberOfPages; i++) {
          const page = pages[i];
          const { width, height } = page.getSize();
          page.drawImage(image, {
            // x: width / 2 - pngDims.width / 2,
            // y: height / 2 - pngDims.height / 2,
            x: width - pngDims.width - 10,
            y: 10,
            width: pngDims.width,
            height: pngDims.height,
            opacity: 0.5,
          });
        }
      }
      fs.writeFileSync(pdfFile, await document.save());
    }
  });

  req.body = {
    _id: id,
    ...req.body,
    file: file.name,
  };
});
