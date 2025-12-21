const expess = require("express");
const cors = require("cors");
const { router } = require("./routes/route");

const app = expess();
const middlewareArray = [
  cors(),
  expess.json(),
  expess.urlencoded({ extended: true }),
];

//using middleware
app.use(middlewareArray);
app.use("/", router);

module.exports = app;
