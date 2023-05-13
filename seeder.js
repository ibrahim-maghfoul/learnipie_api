const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load dotenv Variables
dotenv.config({ path: "./config/config.env" });

//Load models
const Course = require("./models/Course");
const Level = require("./models/Level");
const Subject = require("./models/Subject");
const Guidance = require("./models/Guidance");
const Exam = require("./models/Exam");
const User = require("./models/User");
const Scholarship = require("./models/Scholarship");

//Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Set Mongoose options
mongoose.set('strictQuery', true);

//read JSON files
const levels = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/levels.json`, "utf-8")
);
const guidances = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/guidances.json`, "utf-8")
);
const subjects = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/subjects.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
const exams = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/exams.json`, "utf-8")
);
// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
// );

//Import into DB
const importData = async () => {
  try {
    // for (const [index, course] of courses.entries()) {
    //   console.log(`Inserting course ${index + 1} of ${courses.length}`);
    //   await Course.create(course);
    // }
    // for (const [index, exam] of exams.entries()) {
    //   console.log(`Inserting exam ${index + 1} of ${exams.length}`);
    //   await Exam.create(exam);
    // }
   
    for (const [index, subject] of subjects.entries()) {
      console.log(`Inserting subject ${index + 1} of ${subjects.length}`);
      await Subject.create(subject);
    }
    
    await Level.create(levels,{ timeout: 20000 });
    await Guidance.create(guidances,{ timeout: 20000 });
    // await Subject.create(subjects,{ timeout: 20000 });
    //  await Exam.create(exams,{ timeout: 20000 });
    //await Course.create(courses,{ timeout: 70000 });
    // await User.create(users);
    console.log("DATA imported ");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Course.deleteMany();
    //  await Level.deleteMany();
    //  await Guidance.deleteMany();
    //  await Subject.deleteMany();
    // await Exam.deleteMany();
    await User.deleteMany();
     await Scholarship.deleteMany();
    console.log("DATA deleted...");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}