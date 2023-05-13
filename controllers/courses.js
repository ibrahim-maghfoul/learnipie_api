const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
// const advancedResults = require("../middlewares/advancedResult");

// @desc         Get courses
// @route        GET /api/v1/courses/
// @route        GET /api/v1/courses
// @access       Public
exports.getAllCourses = asyncHandler(async (req, res, next) => {
 
  res.status(200).json(res.advancedResults);
});
// @desc         Get courses
// @route        GET /api/v1/courses/:subjectId
// @access       Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find({ subject: req.params.subjectId });
  return res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc         Get single course
// @route        GET /api/v1/courses/:id
// @access       Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return new ErrorResponse(
      `Course not found with the id of ${req.params.id}`,
      404
    );
  }
  return res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc         Add a course
// @route        POST /api/v1/courses/:bootcamId/courses
// @access       Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create({
    ...req.body,
    subject: req.params.subjectId,
  });
  res.status(201).json({ Success: true, data: course });
});

// @desc         Update a course
// @route        PUT /api/v1/courses/id
// @access       Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return new ErrorResponse(
      `Course not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: course });
});

// @desc         Delete a course
// @route        DELETE /api/v1/courses/id
// @access       Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return new ErrorResponse(
      `Course not found with the id of ${req.params.id}`,
      404
    );
  }
  course.remove();
  res.status(200).json({ success: true, data: {} });
});
