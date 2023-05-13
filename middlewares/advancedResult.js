const Scholarship = require("../models/Scholarship");

const advancedResult = (model, populate, level) => async (req, res, next) => {
  let query;

  //copy req.query
  const reqQuery = { ...req.query };

  //field to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  //loop over removeFields and delete them from query
  removeFields.forEach((query) => delete reqQuery[query]);

  //create query string
  let queryStr = JSON.stringify(reqQuery);

  //create operators $gt $gte $lt..
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in")\b/g,
    (match) => `$${match}`
  );

  // finding resources
  if (level) {
  // console.log(`SELECTED THE LEVEL ${req.user.level}`)
  query = model.find({ level: req.user.level, ...JSON.parse(queryStr) });
  } else {
    query = model.find(JSON.parse(queryStr));
  }

  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort({ createdAt: -1 });
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate && populate !== "") {
    query = query.populate(populate);
  }

  //exucting query
  const results = await query;

  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};

module.exports = advancedResult;
