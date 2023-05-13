const mongoose = require("mongoose");

const LevelSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a level title"],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Level", LevelSchema);
