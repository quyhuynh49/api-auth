const express = require("express");
const app = express();
const UserRoute = require("./Routes/User.route");
require("dotenv").config();
const createError = require("http-errors");

app.get("/", (req, res, next) => {
  res.send("home page");
});

app.use("/user", UserRoute);

app.use((req, res, next) => {
  // const error = new Error("not found");
  // error.status = 500;
  // next(error);
  next(createError.NotFound("this route does not exist."));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
