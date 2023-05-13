const asyncHandler = require("../middlewares/async");
const ExaminationDocument = require("../models/ExaminationDocument");
const ErrorResponse = require("../utils/errorResponse");
const { uploadPdf } = require("../middlewares/pdfUpload");
const fs = require("fs");
const advancedResults = require("../middlewares/advancedResult");
const { deleteFile } = require("../middlewares/deleteFile");


// @desc         Get examinationsdocuments
// @route        GET /api/v1/examinationsdocuments/
// @access       Public
exports.getAllExaminationDocument = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
// @desc         Get examinationsdocuments
// @route        GET /api/v1/examinationsdocuments/examinationId
// @access       Public
exports.getExaminationDocuments = asyncHandler(async (req, res, next) => {
  if (req.params.examinationId) {
    const examinationsdocuments = await ExaminationDocument.find({
      examination: req.params.examinationId,
    });
    return res.status(200).json({
      success: true,
      count: examinationsdocuments.length,
      data: examinationsdocuments,
    });
  }
});

// @desc         Get single course
// @route        GET /api/v1/examinationsdocuments/:id
// @access       Public
exports.getExaminationDocument = asyncHandler(async (req, res, next) => {
  const examination = await ExaminationDocument.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: examination,
  });
});

// @desc         Add a course
// @route        POST /api/v1/examinationsdocuments/:examinationId/examinationsdocuments
// @access       Private
exports.createExaminationDocument = asyncHandler(async (req, res, next) => {
  await uploadPdf(req, "examination Documents", next);

  const examinationdocumentEle = await ExaminationDocument.create({
    ...req.body,
    examination: req.params.examinationId,
  });

  const examinationdocument = await ExaminationDocument.create(
    examinationdocumentEle
  );
  res.status(201).json({ Success: true, data: examinationdocument });
});

// @desc         Update a course
// @route        PUT /api/v1/examinationsdocuments/id
// @access       Private
exports.updateExaminationDocument = asyncHandler(async (req, res, next) => {
  let examinationDocumentBody;
  if (!req.files) {
    examinationDocumentBody = req.body;
  } else {
    examinationDocumentBody = uploadPdf(req, "examination Documents", next);;
  }
  const examinationdocument = await ExaminationDocument.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!examinationdocument) {
    return new ErrorResponse(
      `ExaminationDocument not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: examinationdocument });
});

// @desc         Delete a course
// @route        DELETE /api/v1/examinationsdocuments/id
// @access       Private
exports.deleteExaminationDocument = asyncHandler(async (req, res, next) => {
  const examinationdocument = await ExaminationDocument.findById(req.params.id);
  if (!examinationdocument) {
    return new ErrorResponse(
      `ExaminationDocument not found with the id of ${req.params.id}`,
      404
    );
  }
  const examinationdocumentPdf = examinationdocument.pdf;

  var filePath =`${process.env.DOCUMENTS_PATH}/examinationDocuments/${examinationdocumentPdf}`; 
  deleteFile(filePath, (err) => {
    if (err) {
      examinationdocument.remove();
      return next(err);
    }
    examinationdocument.remove();
    res.status(200).json({ success: true, data: {} });
  });

});
