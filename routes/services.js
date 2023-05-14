const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResult");
const Service = require("../models/Service");

const {
  createService,
  deleteAllServices,
  deleteService,
  getService,
  getServices,
  updateService,
  sendEmail,
} = require("../controllers/services");

const {verifyApiKey} = require("../middlewares/auth");


router.use(verifyApiKey)
router
  .route("/:id")
  .get(getService)

  .put(protect, authorize("admin"), updateService)
  .delete(protect, authorize("admin"), deleteService);

router
  .route("/")
  .get(advancedResults(Service), getServices)
  .post(protect, authorize("admin"), createService)
  .delete(protect, authorize("admin"), deleteAllServices);
  router
    .route("/sendEmail").post(sendEmail)

module.exports = router;
