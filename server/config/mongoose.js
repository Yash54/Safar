const mongoose = require("mongoose");
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://tester:test007@rentsystem.tdjov.mongodb.net/RentingSystem?retryWrites=true&w=majority";
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
