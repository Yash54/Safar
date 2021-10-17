const mongoose = require("mongoose");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = String(process.env.DB_URL);
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;

db.on("error", console.log.bind(console, "Error connecting db"));
db.once("open", function () {
  console.log(`Connected to db`);
});

module.exports = db;
