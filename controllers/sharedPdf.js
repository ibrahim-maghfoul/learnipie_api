const asyncHandler = require("../middlewares/async");
const SharedPdf = require("../models/SharedPdf");
const ErrorResponse = require("../utils/errorResponse");
const { uploadPdf } = require("../middlewares/pdfUpload");
const fs = require("fs");
const advancedResults = require("../middlewares/advancedResult");
const { deleteFile } = require("../middlewares/deleteFile");


// @desc         Get sharedPdfs
// @route        GET /api/v1/sharedpdfs/
// @route        GET /api/v1/sharedpdfs
// @access       Public
exports.getSharedPdfs = asyncHandler(async (req, res, next) => {
   res.status(200).json(res.advancedResults);
});

// @desc         Get single sharedpdf
// @route        GET /api/v1/sharedpdfs/:id
// @access       Public
exports.getSharedPdf = asyncHandler(async (req, res, next) => {
  const sharedpdf = await SharedPdf.findById(req.params.id).populate({
    path: "user",
    select: "name image",
  });
  if (!sharedpdf) {
    return new ErrorResponse(
      `SharedPdf not found with the id of ${req.params.id}`,
      404
    );
  }
  return res.status(200).json({
    success: true,
    data: sharedpdf,
  });
});

// @desc         Add a sharedpdf
// @route        POST /api/v1/sharedpdfs/:bootcamId/sharedpdfs
// @access       Private
exports.createSharedPdf = asyncHandler(async (req, res, next) => {
  await uploadPdf(req, "sharedPdfs", next);

  if (!req.body.file) {
    return next(new ErrorResponse("file doesn't exist and it's required", 400));
  } else {
    const sharedpdf = await SharedPdf.create({
      ...req.body,
      user: req.user.id,
      level: req.user.level,
    });
    res.status(201).json({ success: true, data: sharedpdf });
  }
});

// @desc         Update a sharedpdf
// @route        PUT /api/v1/sharedpdfs/id
// @access       Private
exports.updateSharedPdf = asyncHandler(async (req, res, next) => {
  let sharedPdfBody;
  if (!req.files) {
    sharedPdfBody = req.body;
  } else {
    sharedPdfBody = uploadPdf(req);
  }
  const sharedpdf = await SharedPdf.findByIdAndUpdate(
    req.params.id,
    sharedPdfBody,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!sharedpdf) {
    return new ErrorResponse(
      `SharedPdf not found with the id of ${req.params.id}`,
      404
    );
  }

  return res.status(200).json({
    success: true,
    data: sharedpdf,
  });
});

// @desc         Delete a sharedpdf
// @route        DELETE /api/v1/sharedpdfs/id
// @access       Private
exports.deleteSharedPdf = asyncHandler(async (req, res, next) => {
  const sharedPdf = await SharedPdf.findById(req.params.id);
  if (!sharedPdf) {
    return new ErrorResponse(
      `SharedPdf not found with the id of ${req.params.id}`,
      404
    );
  }
  const sharedPdfFile = sharedPdf.pdf;

  var filePath = `${process.env.DOCUMENTS_PATH}/sharedPdfs/${sharedPdfFile}`;

  deleteFile(filePath, (err) => {
    if (err) {
      sharedPdf.remove();
      return next(err);
    }
    sharedPdf.remove();
    res.status(200).json({ success: true, data: {} });
  });



});

// @desc         Delete a sharedpdf
// @route        DELETE /api/v1/sharedpdfs/id
// @access       Private
exports.deleteAllSharedPdfs = asyncHandler(async (req, res, next) => {
  fs.rmSync(`${process.env.DOCUMENTS_PATH}/sharedPdfs/`, {
    recursive: true,
    force: true,
  });
  await SharedPdf.deleteMany();

  res.status(200).json({ success: true, data: {} });
});
