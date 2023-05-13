const express = require("express");
const router = express.Router();
const advancedResults = require("../middlewares/advancedResult");
const Subject = require("../models/Subject");
const { protect, authorize } = require("../middlewares/auth");
const {
  getSubjects,
  createSubject,
  deleteSubject,
  getSubject,
  updateSubject,
  getSubjectsWithCoursesAndExams,
} = require("../controllers/subjects");

router
  .route("/:guidanceId")
  .get(protect,advancedResults(Subject), getSubjects)
  .post(createSubject);
router
  .route("/:guidanceId/full")
  .get(
    advancedResults(Subject, "courses exams"),
    getSubjectsWithCoursesAndExams
  );
router
  .route("/:id/subject")
  .get(getSubject)
  .put(updateSubject)
  .delete(deleteSubject);

module.exports = router;
