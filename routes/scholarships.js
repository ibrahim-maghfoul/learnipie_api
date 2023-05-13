const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResult");
const Scholarship = require("../models/Scholarship");

const {
  createScholarship,
  deleteScholarship,
  getScholarship,
  updateScholarship,
  getAllScholarships,
  likeScholarship,
} = require("../controllers/scholarships");

router
  .route("/:id")
  .get(getScholarship)

  .put(protect, authorize("admin"), updateScholarship)
  .delete(protect, authorize("admin"), deleteScholarship);
router.route("/:id/like").get(protect, likeScholarship);
router
  .route("/")
  .get(advancedResults(Scholarship), getAllScholarships)
  .post(protect, authorize("admin"), createScholarship);

module.exports = router;
