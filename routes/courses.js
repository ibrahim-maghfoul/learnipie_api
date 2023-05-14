const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResult");
const Course = require("../models/Course");

const {
  getCourses,
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
  getAllCourses,
} = require("../controllers/courses");
const {verifyApiKey} = require("../middlewares/auth");


router.use(verifyApiKey)
router
  .route("/:subjectId")
  .get(getCourses)
  .post(protect, authorize("admin"), createCourse);
router
  .route("/:id/course")
  .get(getCourse)
  .put(protect, authorize("admin"), updateCourse)
  .delete(protect, authorize("admin"), deleteCourse);
router
  .route("/")
  .get(
    advancedResults(Course, { path: "subject", select: "title" }),
    getAllCourses
  );

module.exports = router;
