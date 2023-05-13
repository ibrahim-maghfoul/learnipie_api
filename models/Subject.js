const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a course title"],
    },

    description: {
      type: String,
    },
    guidance: {
      type: mongoose.Schema.ObjectId,
      ref: "Guidane",
      required: true,
    },
    icon: {
      type: String,
      trim: true,
      required: [true, "Please provide an Icon"],
    },
    course_count: {
      type: Number,

      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Reverse populate with virtuals
SubjectSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "subject",
  justOne: false,
});
//Reverse populate with virtuals
SubjectSchema.virtual("exams", {
  ref: "Exam",
  localField: "_id",
  foreignField: "subject",
  justOne: false,
});

module.exports = mongoose.model("Subject", SubjectSchema);
