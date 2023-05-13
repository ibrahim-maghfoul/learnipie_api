const mongoose = require("mongoose");

const StorySchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please add a Type!"],
    enum: ["image", "text"],
  },
  title: {
    type: String,
    required: [true, "Please add a Title!"],
  },
  image: {
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

module.exports = mongoose.model("Story", StorySchema);
