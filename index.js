const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const sharp = require("sharp");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const {verifyApiKey} = require("./middlewares/auth");


const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const auth = require("./routes/auth");
const users = require("./routes/users");
const levels = require("./routes/levels");
const guidances = require("./routes/guidances");
const subjects = require("./routes/subjects");
const examination = require("./routes/examination");
const examinationDocument = require("./routes/examinationDocument");
const courses = require("./routes/courses");
const exams = require("./routes/exams");
const scholarships = require("./routes/scholarships");
const sharedPdf = require("./routes/sharedPdf");
const story = require("./routes/story");
const service = require("./routes/services");
// const imageSharpers = require("./routes/imageSharpers");
// const advancedResults = require("./middlewares/advancedResult")

const { sharpImages } = require("./controllers/imageSharpers");


 

// Load ENV
dotenv.config({ path: "./config/config.env" });

// Connect to db
connectDB();

const app = express();

// enable cors
app.use(cors({
  origin: '*',
  credentials: true
}))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// body parser
// app.use(bodyParser.json());

//Cookie parser
app.use(cookieParser());

// Morgan middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Sanitize data
app.use(mongoSanitize());

//File uploade
app.use(fileupload());

// app.use("/uploads/images/scholarships/:image/:width", sharpImages);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));


//generate api key
// const payload = { userId: 1 };
// const secretKey = process.env.JWT_SECRET;
// const expiresIn = process.env.JWT_EXPIRE;

// const apiKey = jwt.sign(payload, secretKey);
// console.log(apiKey);



// Routes file
app.get(`/`, function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'website', 'index.html'));
});

const URL = "/learnipie/";
app.use(`${URL}api/v1/auth`, auth);
// app.use(verifyApiKey);
app.use(`${URL}api/v1/levels`, levels);
app.use(`${URL}api/v1/guidances`, guidances);
app.use(`${URL}api/v1/subjects`, subjects);
app.use(`${URL}api/v1/courses`, courses);
app.use(`${URL}api/v1/exams`, exams);
app.use(`${URL}api/v1/users`, users);
app.use(`${URL}api/v1/scholarships`, scholarships);
app.use(`${URL}api/v1/sharedPdf`, sharedPdf);
app.use(`${URL}api/v1/stories`, story);
app.use(`${URL}api/v1/examinationDocument`, examinationDocument);
app.use(`${URL}api/v1/examination`, examination);
app.use(`${URL}api/v1/services`, service);

// Handle errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(
    `Server Running at ${PORT} port, in ${process.env.NODE_ENV} mode! `
  );
});

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };



// const server = https.createServer(options, app);

// server.listen(PORT, () => {
//   console.log(
//     `Server Running at ${PORT} port, in ${process.env.NODE_ENV} mode! `
//   );
// });

//Handle Unhadled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
