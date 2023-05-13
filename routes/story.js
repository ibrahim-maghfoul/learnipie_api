const express = require("express");
const router = express.Router({ mergeParams: true });
const Story = require("../models/Story");
const advancedResults = require("../middlewares/advancedResult");

const {
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
} = require("../controllers/stories");

const { protect, authorize } = require("../middlewares/auth");

router
  .route("/")
  .get(protect, advancedResults(Story, "", true), getStories)
  .post(protect, authorize("admin"), createStory);
router
  .route("/:id")
  .get(getStory)
  .put(protect, authorize("admin"), updateStory)
  .delete(protect, authorize("admin"), deleteStory);

module.exports = router;

//  .get(
//     (req, res, next) => {
//       protect();
//       next();
//     },
//     (req, res, next) => {
//       authorize();
//       next();
//     },
//     (req, res, next) => {
//       console.log(req.user);
//       advancedResults(Story, req);
//       next();
//     },
//     (req, res, next) => {
//       getStories();
//       next();
//     }
//   )
