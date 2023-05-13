const mongoose = require("mongoose");

const ExaminationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide a title"],
    },

    description: {
      type: String,
      default: "",
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    informations: {
      type: String,
      default: "",
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

ExaminationSchema.virtual("examinationDocument", {
  ref: "ExaminationDocument",
  localField: "_id",
  foreignField: "examination",
  justOne: false,
});

module.exports = mongoose.model("Examination", ExaminationSchema);
