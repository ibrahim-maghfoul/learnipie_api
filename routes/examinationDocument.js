const express = require("express");
const router = express.Router();
const advancedResults = require("../middlewares/advancedResult");
const ExaminationDocument = require("../models/ExaminationDocument");
const {
  getExaminationDocuments,
  createExaminationDocument,
  deleteExaminationDocument,
  getExaminationDocument,
  updateExaminationDocument,
  getAllExaminationDocument,
} = require("../controllers/examinationsDocuments");

router
  .route("/examination/:examinationId")
  .get(getExaminationDocuments)
  .post(createExaminationDocument);
router
  .route("/:id")
  .get(getExaminationDocument)
  .put(updateExaminationDocument)
  .delete(deleteExaminationDocument);
router
  .route("/")
  .get(advancedResults(ExaminationDocument), getAllExaminationDocument);

module.exports = router;
