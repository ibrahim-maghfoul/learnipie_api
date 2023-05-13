const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");
const router = express.Router();
const { protect } = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);
router.route("/logout").get(logout);
router.route("/forgetpassword").post(forgotPassword);
router.route("/resetpassword/:resttoken").put(resetPassword);
router.route("/updatedetails").put(protect, updateDetails);
router.route("/updatepassword").put(protect, updatePassword);

module.exports = router;
