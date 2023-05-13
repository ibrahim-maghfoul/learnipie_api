const asyncHandler = require("../middlewares/async");
const Level = require("../models/Level");
const ErrorResponse = require("../utils/errorResponse");

// @desc         Get levels
// @route        GET /api/v1/levels/
// @route        GET /api/v1/levels
// @access       Public
exports.getLevels = asyncHandler(async (req, res, next) => {
  const levels = await Level.find();
  return res.status(200).json({
    success: true,
    count: levels.length,
    data: levels,
  });
});

// @desc         Get single course
// @route        GET /api/v1/levels/:id
// @access       Public
exports.getLevel = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    const level = await Level.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: level,
    });
  }
});

// @desc         Add a course
// @route        POST /api/v1/levels/:bootcamId/levels
// @access       Private
exports.createLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.create(req.body);
  res.status(201).json({ Success: true, data: level });
});

// @desc         Update a course
// @route        PUT /api/v1/levels/id
// @access       Private
exports.updateLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!level) {
    return new ErrorResponse(
      `Level not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: level });
});

// @desc         Delete a course
// @route        DELETE /api/v1/levels/id
// @access       Private
exports.deleteLevel = asyncHandler(async (req, res, next) => {
  const level = await Level.findById(req.params.id);
  if (!level) {
    return new ErrorResponse(
      `Level not found with the id of ${req.params.id}`,
      404
    );
  }
  level.remove();
  res.status(200).json({ success: true, data: {} });
});
