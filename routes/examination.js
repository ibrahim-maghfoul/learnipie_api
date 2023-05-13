const express = require("express");
const router = express.Router();
const advancedResults = require("../middlewares/advancedResult");
const Examination = require("../models/Examination");
const { protect, authorize } = require("../middlewares/auth");
const {
  getExaminations,
  createExamination,
  deleteExamination,
  getExamination,
  updateExamination,
} = require("../controllers/examinations");

router
  .route("/full")
  .get(
    protect,
    authorize("admin"),
    advancedResults(Examination, "examinationDocument"),
    getExaminations
  );
router
  .route("/")
  .get(advancedResults(Examination), getExaminations)
  .post(protect, authorize("admin"), createExamination);
router
  .route("/:id")
  .get(getExamination)
  .put(protect, authorize("admin"), updateExamination)
  .delete(protect, authorize("admin"), deleteExamination);

module.exports = router;
