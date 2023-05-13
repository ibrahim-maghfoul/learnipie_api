const asyncHandler = require("../middlewares/async");
const Subject = require("../models/Subject");
const ErrorResponse = require("../utils/errorResponse");

// @desc         Get subjects
// @route        GET /api/v1/subjects/
// @route        GET /api/v1/subjects
// @access       Public
exports.getSubjectsWithCoursesAndExams = asyncHandler(
  async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  }
);

// @desc         Get subjects
// @route        GET /api/v1/subjects/
// @route        GET /api/v1/subjects
// @access       Public
exports.getSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await Subject.find({ guidance: req.params.guidanceId });
  return res.status(200).json({
    success: true,
    count: subjects.length,
    data: subjects,
  });
});

// @desc         Get single course
// @route        GET /api/v1/subjects/:id
// @access       Public
exports.getSubject = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return new ErrorResponse(
      `Bootcamp not found with the id of ${req.params.id}`,
      404
    );
  }
  return res.status(200).json({
    success: true,
    data: subject,
  });
});

// @desc         Add a course
// @route        POST /api/v1/subjects/:bootcamId/subjects
// @access       Private
exports.createSubject = asyncHandler(async (req, res, next) => {
  const subjectEle = { title: req.body.title, guidance: req.params.guidanceId };
  const subject = await Subject.create(subjectEle);

  res.status(201).json({ Success: true, data: subject });
});

// @desc         Update a course
// @route        PUT /api/v1/subjects/id
// @access       Private
exports.updateSubject = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!subject) {
    return new ErrorResponse(
      `Guidance not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: subject });
});

// @desc         Delete a course
// @route        DELETE /api/v1/subjects/id
// @access       Private
exports.deleteSubject = asyncHandler(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return new ErrorResponse(
      `Subject not found with the id of ${req.params.id}`,
      404
    );
  }
  subject.remove();
  res.status(200).json({ success: true, data: {} });
});
