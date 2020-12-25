const express = require("express");
const Sentry = require("@sentry/node");
const cors = require("cors");
const mongoose = require("mongoose");
const GraphQlServer = require("./app.js");
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_API_KEY,
  });
}

const app = express();

app.use(cors());
app.use(express.json());

(async function () {
  require("child_process").exec("clear", (err, stdout) => {
    if (err) console.log(err);
    console.log(stdout);
  });

  console.log("Connecting to DB....");
  await mongoose.connect(
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB_URI
      : process.env.PRODUCTION_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  console.log("Database connection Established 🚀🚀");

  const graphqlServer = GraphQlServer();
  graphqlServer.applyMiddleware({
    app,
    path: "/graphql",
  });
  app.listen(process.env.PORT, () => {
    console.log("Server started on port", process.env.PORT, "☕️");
  });
})();
