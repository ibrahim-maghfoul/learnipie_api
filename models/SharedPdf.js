const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const SharedPdfSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a Title!"],
  },
  description: {
    type: String,
    required: [true, "Please add Description!"],
  },

  file: {
    type: String,
    required: [true, "Please add File!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  level: {
    type: mongoose.Schema.ObjectId,
    ref: "Level",
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("SharedPdf", SharedPdfSchema);
