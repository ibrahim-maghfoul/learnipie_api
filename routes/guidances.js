const express = require("express");
const router = express.Router();

const {
  getGuidances,
  createGuidance,
  deleteGuidance,
  getGuidance,
  updateGuidance,
} = require("../controllers/guidances");

router.route("/:levelId").get(getGuidances).post(createGuidance);
router
  .route("/:id/guidance")
  .get(getGuidance)
  .put(updateGuidance)
  .delete(deleteGuidance);

module.exports = router;
