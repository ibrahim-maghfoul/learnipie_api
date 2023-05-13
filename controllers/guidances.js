const asyncHandler = require("../middlewares/async");
const Guidance = require("../models/Guidance");
const ErrorResponse = require("../utils/errorResponse");

// @desc         Get guidances
// @route        GET /api/v1/guidances/
// @route        GET /api/v1/guidances
// @access       Public
exports.getGuidances = asyncHandler(async (req, res, next) => {
  if (req.params.levelId) {
    const guidances = await Guidance.find({ level: req.params.levelId });
    return res.status(200).json({
      success: true,
      count: guidances.length,
      data: guidances,
    });
  }
});

// @desc         Get single course
// @route        GET /api/v1/guidances/:id
// @access       Public
exports.getGuidance = asyncHandler(async (req, res, next) => {
  const level = await Guidance.findById(req.params.id);
  return res.status(200).json({
    success: true,
    data: level,
  });
});

// @desc         Add a course
// @route        POST /api/v1/guidances/:bootcamId/guidances
// @access       Private
exports.createGuidance = asyncHandler(async (req, res, next) => {
  const guidanceEle = { title: req.body.title, level: req.params.levelId };
  const guidance = await Guidance.create(guidanceEle);
  res.status(201).json({ Success: true, data: guidance });
});

// @desc         Update a course
// @route        PUT /api/v1/guidances/id
// @access       Private
exports.updateGuidance = asyncHandler(async (req, res, next) => {
  const guidance = await Guidance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!guidance) {
    return new ErrorResponse(
      `Guidance not found with the id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: guidance });
});

// @desc         Delete a course
// @route        DELETE /api/v1/guidances/id
// @access       Private
exports.deleteGuidance = asyncHandler(async (req, res, next) => {
  const guidance = await Guidance.findById(req.params.id);
  if (!guidance) {
    return new ErrorResponse(
      `Guidance not found with the id of ${req.params.id}`,
      404
    );
  }
  guidance.remove();
  res.status(200).json({ success: true, data: {} });
});
