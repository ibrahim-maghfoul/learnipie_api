const asyncHandler = require("../middlewares/async");
const Service = require("../models/Service");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const advancedResults = require("../middlewares/advancedResult");
const { uploadPdf } = require("../middlewares/pdfUpload");
const { uploadPhoto } = require("../middlewares/uploadPhoto");
const { deleteFile } = require("../middlewares/deleteFile");
const sendEmail = require("../utils/sendEmail");



// @desc         Get services
// @route        GET /api/v1/services/
// @route        GET /api/v1/services
// @access       Public
exports.getServices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc         Get single service
// @route        GET /api/v1/services/:id
// @access       Public
exports.getService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return new ErrorResponse(
      `Service not found with the id of ${req.params.id}`,
      404
    );
  }
  return res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc         Add a service
// @route        POST /api/v1/services/:id
// @access       Private
exports.createService = asyncHandler(async (req, res, next) => {
  await uploadPdf(req, "services", next);
  await uploadPhoto(req, "icons", next);

  if (!req.body.file || !req.body.image) {
    return next(new ErrorResponse("file doesn't exist and it's required", 400));
  } else {
    const service = await Service.create(req.body, {
      runValidators: true,
    });
    res.status(201).json({ success: true, data: service });
  }
});

// @desc         Update a service
// @route        PUT /api/v1/services/id
// @access       Private
exports.updateService = asyncHandler(async (req, res, next) => {
  let serviceBody;
  if (!req.files) {
    serviceBody = req.body;
  } else {
    if (req.files.file) {
      serviceBody = uploadPdf(req, "services", next);
    }
    if (req.files.image) {
      serviceBody = await uploadPhoto(req, "icons", next);
    }
  }
  const service = await Service.findByIdAndUpdate(req.params.id, serviceBody, {
    new: true,
    runValidators: true,
  });
  if (!service) {
    return new ErrorResponse(
      `Service not found with the id of ${req.params.id}`,
      404
    );
  }

  return res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc         Delete a service
// @route        DELETE /api/v1/services/id
// @access       Private
exports.deleteService = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return new ErrorResponse(
      `Service not found with the id of ${req.params.id}`,
      404
    );
  }
  const serviceFile = service.image;

  var filePath = `${process.env.DOCUMENTS_PATH}/services/${serviceFile}`;
  deleteFile(filePath, (err) => {
    if (err) {
      service.remove();
      return next(err);
    }
    service.remove();
    res.status(200).json({ success: true, data: {} });
  });


});

// @desc         Delete a service
// @route        DELETE /api/v1/services/id
// @access       Private
exports.deleteAllServices = asyncHandler(async (req, res, next) => {
  fs.rmSync(`${process.env.DOCUMENTS_PATH}/services/`, {
    recursive: true,
    force: true,
  });
  await Service.deleteMany();

  res.status(200).json({ success: true, data: {} });
});



// @desc         Add a service
// @route        POST /api/v1/services/sendEmail
// @access       Private
exports.sendEmail = asyncHandler(async (req, res, next) => {
  console.log("Will send email")
  const email = {
    email: req.body.email,
    name: req.body.name,
      subject: req.body.subject ,
      message:req.body.message,
  }
 
  try {
    await sendEmail(email);
    res.status(200).json({ success: true, data: "Email sent!" });
  } catch (error) {
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});