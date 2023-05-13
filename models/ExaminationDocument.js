const mongoose = require("mongoose");

const ExaminationDocumentSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a title"],
  },

  file: {
    type: String,
    required: [true, "Please provide a document"],
  },
  examination: {
    type: mongoose.Schema.ObjectId,
    ref: "Examination",
    required: true,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model(
  "ExaminationDocument",
  ExaminationDocumentSchema
);
