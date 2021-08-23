const mongoose = require("mongoose");
const date = require("date-and-time");
const db = require("../config/mongoose");


const RequestBookingSchema = new mongoose.Schema({
  bookingid: {
    type: String,
    required: true,
    unique: true,
  },
  lender_email: {
    type: String,
    required: true,
  },
  borrower_email: {
    type: String,
    required: true,
  },
  carid: {
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
  rent: {
    type: Number,
    required: true,
  },
  booking_status: {
    type: Number,
    default: -1,
    required: true,
  },
});

const RequestBooking = mongoose.model("RequestBooking", RequestBookingSchema);

// const pattern = date.compile("YYYY-MM-DD");
// var tod = date.format(new Date("2021-08-10"), pattern);
// var fromd = date.format(new Date("2021-08-05"), pattern);
// const rb1 = new RequestBooking({
//   bookingid: "B3",
//   lender_email: "batman@wayne.com",
//   borrower_email: "flash@starlabs.com",
//   carid: "C2",
//   from_date: fromd,
//   to_date: tod,
//   rent: 10000,
// });

// rb1.save();
module.exports = RequestBooking;
