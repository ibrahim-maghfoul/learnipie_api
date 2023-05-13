const asyncHandler = require("../middlewares/async");
const Exam = require("../models/Exam");
const ErrorResponse = require("../utils/errorResponse");

// @desc         Get exams
// @route        GET /api/v1/exams/
// @route        GET /api/v1/exams
// @access       Public
exports.getAllExams = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc         Get exams
// @route        GET /api/v1/exams/
// @route        GET /api/v1/exams
// @access       Public
exports.getExams = asyncHandler(async (req, res, next) => {
  const exams = await Exam.find({ subject: req.params.subjectId });
  return res.status(200).json({
    success: true,
    count: exams.length,
    data: exams,
  });
});

// @desc         Get single exam
// @route        GET /api/v1/exams/:id
// @access       Public
exports.getExam = asyncHandler(async (req, res, next) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) {
    return new ErrorResponse(
      `Bootcamp not found with the id of ${req.params.id}`,
      404
    );
  }
  return res.status(200).json({
    success: true,
    data: exam,
  });
});

// @desc         Add a exam
// @route        POST /api/v1/exams/:bootcamId/exams
// @access       Private
exports.createExam = asyncHandler(async (req, res, next) => {
  const exam = await Exam.create({
    ...req.body,
    subject: req.params.subjectId,
  });
  res.status(201).json({ Success: true, data: exam });
});

// @desc         Update a exam
// @route        PUT /api/v1/exams/id
// @access       Private
exports.updateExam = asyncHandler(async (req, res, next) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!exam) {
    return new ErrorResponse(
      `Guidance not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: exam });
});

// @desc         Delete a exam
// @route        DELETE /api/v1/exams/id
// @access       Private
exports.deleteExam = asyncHandler(async (req, res, next) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) {
    return new ErrorResponse(
      `Exam not found with the id of ${req.params.id}`,
      404
    );
  }
  exam.remove();
  res.status(200).json({ success: true, data: {} });
});
