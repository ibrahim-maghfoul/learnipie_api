const mongoose = require("mongoose");

const GuidanceSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a course title"],
  },
  description: {
    type: String,
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

module.exports = mongoose.model("Guidance", GuidanceSchema);
