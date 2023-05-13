const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a course title"],
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
  coursesPdf: [
    {
      title: {
        type: String,
        trim: true,
      },
      course: {
        type: String,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
    },
  ],

  videos: [
    {
      title: {
        type: String,
        trim: true,
      },
      video: {
        type: String,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
    },
  ],

  exercices: {
    type: [
      {
        title: {
          type: String,
          trim: true,
        },
        exercice: {
          type: String,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
      },
    ],
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

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Course", CourseSchema);
// module.exports = mongoose.model("Exam", ExamSchema);
