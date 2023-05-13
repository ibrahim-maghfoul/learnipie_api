const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    // required: [true, "Please provide a exam title"],
  },
  description: {
    type: String,
  },
  subject: {
    type: mongoose.Schema.ObjectId,
    ref: "Subject",
    required: true,
  },
  res_count: {
    type: Number,

    required: true,
  },
  resourses: {
    type: [
      {
        title: {
          type: String,
          trim: true,
        },
        resourse: {
          type: String,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  examsPdf: {
    type: [
      {
        title: {
          type: String,
          trim: true,
        },
        exam: {
          type: String,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
