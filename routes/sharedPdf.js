const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResult");
const SharedPdf = require("../models/SharedPdf");

const {
  createSharedPdf,
  deleteSharedPdf,
  getSharedPdfs,
  getSharedPdf,
  updateSharedPdf,
  deleteAllSharedPdfs,
} = require("../controllers/sharedpdf");

router
  .route("/:id")
  .get(getSharedPdf)

  .put(protect, updateSharedPdf)
  .delete(protect, deleteSharedPdf);

router
  .route("/")
  .get(
    protect,
    advancedResults(
      SharedPdf,
      {
        path: "user level",
        select: "name image role",
      },
      "level"
    ),
    getSharedPdfs
  )
  .post(protect, createSharedPdf)
  .delete(protect, authorize("admin"), deleteAllSharedPdfs);

module.exports = router;
