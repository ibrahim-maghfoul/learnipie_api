const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");
const Scholarship = require("../models/Scholarship");
const mongoose = require("mongoose");
const fs = require("fs");
const { uploadPhoto } = require("../middlewares/uploadPhoto");
const { deleteFile } = require("../middlewares/deleteFile");

// @desc         Get scholarships
// @route        GET /api/v1/scholarships/
// @route        GET /api/v1/scholarships
// @access       Public
exports.getAllScholarships = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc         Get single scholarship
// @route        GET /api/v1/scholarships/:id
// @access       Public
exports.getScholarship = asyncHandler(async (req, res, next) => {
  // const scholarship = await Scholarship.findByIdAndUpdate(req.params.id);
  var scholarship = await Scholarship.findById(req.params.id)


  if (!scholarship) {
    return next(new ErrorResponse(
      `Course not found with the id of ${req.params.id}`,
      404
    ));
  }

  await Scholarship.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } }
  );
  // scholarship = await Scholarship.aggregate([
  //   { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
  //   { $addFields: { likesnum: { $size: "$likes" } } },
  //   { $project: { likes: 0 } },
  // ]).exec();

  return res.status(200).json({
    success: true,
    data: scholarship,
  });
});

exports.likeScholarship = asyncHandler(async (req, res, next) => {
  let scholarship = await Scholarship.findById(req.params.id);

  if (!scholarship) {
    return res.status(404).json({
      success: false,
      error: "Scholarship not found",
    });
  }

  const result = await Scholarship.updateOne(
    { _id: req.params.id },
    {
      $addToSet: { likes: req.user.id },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (result.modifiedCount) {
    await scholarship.updateOne({ $inc: { likesCount: 1 } });
    scholarship = await Scholarship.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: scholarship,
      liked: true,
    });
  } else {
    return res.status(200).json({
      success: true,
      data: scholarship,
      liked: false,
    });
  }
});

// @desc         Add a scholarship
// @route        POST /api/v1/scholarships/:bootcamId/scholarships
// @access       Private
exports.createScholarship = asyncHandler(async (req, res, next) => {
  uploadPhoto(req, "scholarships", next);
  const scholarship = await Scholarship.create(req.body);
  res.status(200).json({ success: true, data: scholarship });
});

// @desc         Update a scholarship
// @route        PUT /api/v1/scholarships/id
// @access       Private
exports.updateScholarship = asyncHandler(async (req, res, next) => {

  if (req.files) {
    await uploadPhoto(req, "scholarships", next);
  } 
  const scholarship = await Scholarship.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!scholarship) {
    return next(new ErrorResponse(
      `Scholarship not found with the id of ${req.params.id}`,
      404
    ));
  }

  return res.status(200).json({
    success: true,
    data: scholarship,
  });
});

// @desc         Delete a scholarship
// @route        DELETE /api/v1/scholarships/id
// @access       Private
exports.deleteScholarship = asyncHandler(async (req, res, next) => {
  const scholarship = await Scholarship.findById(req.params.id);

  if (!scholarship) {
    return next(
      new ErrorResponse(`Scholarship not found with the id of ${req.params.id}`, 404)
    );
  }

  const scholarshipImg = scholarship.image;
  const filePath = `${process.env.IMAGES_PATH}/scholarships/${scholarshipImg}`;

   deleteFile(filePath, (err) => {
    if (err) {
      scholarship.remove();
      return next(err);
    }
    scholarship.remove();
    res.status(200).json({ success: true, data: {scholarship} });
  });
});
