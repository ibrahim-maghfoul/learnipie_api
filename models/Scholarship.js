const mongoose = require("mongoose");

const ScholarshipSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a title"],
  },

  description: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image"],
  },
  views: {
    type: Number,
    default: 0,
  },

  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  informations: {
    type: String,
    default: "",
  },
  place: {
    type: String,
    default: "Maroc",
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    default: "",
  },
  kind: {
    type: String,
    enum: ["national", "international"],
    default: "national",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

ScholarshipSchema.post("save", function () {});
ScholarshipSchema.pre("remove", function () {});
module.exports = mongoose.model("Scholarship", ScholarshipSchema);
