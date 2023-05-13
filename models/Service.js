const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    require: [true, "Please provide a Service title"],
  },
  description: {
    type: String,
  },

  file: {
    type: String,
    require: [true, "Please provide a File"],
  },
  image: {
    type: String,
    require: [true, "Please provide an Icon"],
  },

  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
// module.exports = mongoose.model("Exam", ExamSchema);
