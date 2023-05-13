const asyncHandler = require("../middlewares/async");
const Examination = require("../models/Examination");
const ErrorResponse = require("../utils/errorResponse");

// @desc         Get examinations
// @route        GET /api/v1/examinations/
// @route        GET /api/v1/examinations
// @access       Public

exports.getExaminations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
// @desc         Get single course
// @route        GET /api/v1/examinations/:id
// @access       Public
exports.getExamination = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const examination = await Examination.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: examination,
    });
  }
});

// @desc         Add a course
// @route        POST /api/v1/examinations/
// @access       Private
exports.createExamination = asyncHandler(async (req, res, next) => {
  const examination = await Examination.create(req.body);
  res.status(201).json({ Success: true, data: examination });
});

// @desc         Update a course
// @route        PUT /api/v1/examinations/:id
// @access       Private
exports.updateExamination = asyncHandler(async (req, res, next) => {
  const examination = await Examination.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!examination) {
    return new ErrorResponse(
      `Examination not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: examination });
});

// @desc         Delete a course
// @route        DELETE /api/v1/examinations/:id
// @access       Private
exports.deleteExamination = asyncHandler(async (req, res, next) => {
  const examination = await Examination.findById(req.params.id);
  if (!examination) {
    return new ErrorResponse(
      `Examination not found with the id of ${req.params.id}`,
      404
    );
  }
  examination.remove();
  res.status(200).json({ success: true, data: {} });
});
