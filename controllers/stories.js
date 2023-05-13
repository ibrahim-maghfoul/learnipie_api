const asyncHandler = require("../middlewares/async");
const Story = require("../models/Story");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const advancedResults = require("../middlewares/advancedResult");
const { uploadPhoto } = require("../middlewares/uploadPhoto");
const { deleteFile } = require("../middlewares/deleteFile");


// @desc         Get stories
// @route        GET /api/v1/stories/
// @route        GET /api/v1/stories
// @access       Public
exports.getStories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc         Get single story
// @route        GET /api/v1/stories/:id
// @access       Public
exports.getStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return next( new ErrorResponse(
      `Story not found with the id of ${req.params.id}`,
      404
    ));
  }
  return res.status(200).json({
    success: true,
    data: story,
  });
});

// @desc         Add a story
// @route        POST /api/v1/stories/:bootcamId/stories
// @access       Private
exports.createStory = asyncHandler(async (req, res, next) => {
  await uploadPhoto(req, "stories", next);
  const story = await Story.create(req.body);
  res.status(201).json({ success: true, data: story });
});

// @desc         Update a story
// @route        PUT /api/v1/stories/id
// @access       Private
exports.updateStory = asyncHandler(async (req, res, next) => {
  let storyBody;
  if (!req.files) {
    storyBody = req.body;
  } else {
    storyBody =  await uploadPhoto(req, "stories", next);
  }
  const story = await Story.findByIdAndUpdate(req.params.id, storyBody, {
    new: true,
    runValidators: true,
  });
  if (!story) {
    return next(new ErrorResponse(
      `Story not found with the id of ${req.params.id}`,
      404
    ));
  }

  return res.status(200).json({
    success: true,
    data: story,
  });
});

// @desc         Delete a story
// @route        DELETE /api/v1/stories/id
// @access       Private
exports.deleteStory = asyncHandler(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return next( new ErrorResponse(
      `Story not found with the id of ${req.params.id}`,
      404
    ));
  }
  const storyFile = story.image;

  var filePath =`${process.env.IMAGES_PATH}/stories/${storyFile}`;

  deleteFile(filePath, (err) => {
    if (err) {
      story.remove();
      return next(err);
    }
    story.remove();
    res.status(200).json({ success: true, data: {} });
  });
 

  
});

// @desc         Delete a story
// @route        DELETE /api/v1/stories/id
// @access       Private
exports.deleteAllStories = asyncHandler(async (req, res, next) => {
  fs.rmSync(`${process.env.IMAGES_PATH}/stories/`, {
    recursive: true,
    force: true,
  });
  await Story.deleteMany();

  res.status(200).json({ success: true, data: {} });
});
