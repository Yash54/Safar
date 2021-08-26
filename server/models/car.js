const mongoose = require("mongoose");
const date = require("date-and-time");
const db = require("../config/mongoose");

const carSchema = new mongoose.Schema({
  carid: {
    type: String,
    required: true,
    unique: true,
  },
  pictures: {
    type: String,
    required: true,
  },
  registration_no: {
    type: String,
    required: true,
    unique: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  deposite: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  modl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  fuel_type: {
    type: String,
    required: true,
  },
  no_of_passengers: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  engine_type: {
    type: String,
  },
  features: [
    {
      feature: String,
    },
  ],
  city: {
    type: String,
    required: true,
  },
  lender_email: {
    type: String,
    required: true,
  },
  from_date: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

// const pattern = date.compile("YYYY-MM-DD");
// var tod = date.format(new Date("2021-08-10"), pattern);
// var fromd = date.format(new Date("2021-08-05"), pattern);
// const car1= new Car({
//     carid: "C1",
//     pictures: "p1",
//     registration_no: "r123",
//     rent: 7000,
//     deposite: 7000,
//     company: "Wayne",
//     modl: "Batmobile",
//     fuel_type: "Hydrogen fuel",
//     no_of_passengers: 2,
//     city: "Gotham",
//     lender_email: "batman@wayne.com",
//     from_date: fromd,
//     to_date: tod
// });
// car1.save();

module.exports = Car;