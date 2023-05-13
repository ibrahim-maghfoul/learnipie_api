const express = require("express");
const router = express.Router();

const {
  getLevels,
  createLevel,
  deleteLevel,
  getLevel,
  updateLevel,
} = require("../controllers/levels");

router.route("/").get(getLevels).post(createLevel);
router.route("/:id").get(getLevel).put(updateLevel).delete(deleteLevel);

module.exports = router;
