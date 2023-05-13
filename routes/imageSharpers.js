const express = require("express");
const router = express.Router();

const { sharpImages } = require("../controllers/imageSharpers");

router.route("/").get(sharpImages);

module.exports = router;
