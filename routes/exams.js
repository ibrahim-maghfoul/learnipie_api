const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const advancedResults = require("../middlewares/advancedResult");

const {
  getExams,
  createExam,
  deleteExam,
  getExam,
  updateExam,
  getAllExams,
} = require("../controllers/exams");
const {verifyApiKey} = require("../middlewares/auth");

router.use(verifyApiKey)

router.route("/:subjectId").get(getExams).post(createExam);
router.route("/:id/exam").get(getExam).put(updateExam).delete(deleteExam);
router
  .route("/")
  .get(
    advancedResults(Exam, { path: "subject", select: "title" }),
    getAllExams
  );

module.exports = router;
