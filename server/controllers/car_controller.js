const cars = require("../models/car");
const confirmedbookings = require("../models/confirmedBooking");
const requestbookings = require("../models/requestBooking");
const date = require("date-and-time");
const user = require("../models/user");
const dayjs = require("dayjs");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
};


module.exports.addcar = function (req, res) {
  try {
    var count;
    var carid;
    var finalcity;
    user.find({ email: req.email }, function (err, user) {
      if (err || !user) {
        return res.status(400).json({ message: "Server Error" });
      }
      finalcity = user[0].city;
    });
    console.log(finalcity);
    const pattern = date.compile("YYYY-MM-DD");
    var tod = date.format(new Date(req.body.to), pattern);
    var fromd = date.format(new Date(req.body.from), pattern);
    cars.find({}, function (err, results) {
      count = results.length;
      count = count + 1;
      carid = "C" + count.toString();
      const newcar = new cars({
        carid: carid,
        pictures: req.body.croppedImage,
        registration_no: req.body.registration,
        rent: req.body.rent,
        deposite: req.body.deposit,
        company: req.body.company,
        modl: req.body.model,
        category: req.body.category,
        fuel_type: req.body.fuel,
        no_of_passengers: req.body.seats,
        color: req.body.color,
        engine_type: req.body.eng,
        features: req.body.features,
        to_date: tod,
        from_date: fromd,
        city: finalcity,
        lender_email: req.email,
      });
      console.log(newcar);
      cars.create(newcar, function (err) {
        if (err) {
          console.log("Error in adding the car to database");
          console.log(err);
          return res.status(404).end();
        } else {
          console.log("Car successfully added to the database");
          return res.status(200).end();
        }
      });
    });
  } catch (err) {
    console.log("Error in catch block");
    return res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.filter = async(req, res)=> {
    try {
      const pattern = date.compile("YYYY-MM-DD");
      var tod = date.format(new Date(req.body.to), pattern);
      var fromd = date.format(new Date(req.body.from), pattern);
      var categories = [],
        brand = [],
        eng = [],
        fuel = [],
        seats = [];
      color = [];
      finalcars = [];
      const email = req.body.email ? req.body.email : "";
      if (req.body.categories.length == 0) {
        categories.push("Hatchback", "Sedan", "SUV", "MUV");
      } else {
        categories = req.body.categories;
      }
      if (req.body.brand.length == 0) {
        brand.push("Hyundai", "Maruti Suzuki", "Mahindra", "Jeep", "Kia");
      } else {
        brand = req.body.brand;
      }
      if (req.body.fuel.length == 0) {
        fuel.push("Petrol", "Diesel", "Petrol + CNG", "Diesel + CNG");
      } else {
        fuel = req.body.fuel;
      }
      if (req.body.eng.length == 0) {
        eng.push("Manual", "Auto");
      } else {
        eng = req.body.eng;
      }
      if (req.body.seats.length == 0) {
        seats.push(7, 5);
      } else {
        seats = req.body.seats;
      }
      if (req.body.color.length == 0) {
        color.push("Crimson Red", "Silver", "White", "Blue", "Black");
      } else {
        color = req.body.color;
      }
      const bookings = await confirmedbookings.find({
        $and: [
            {
                $or: [
                    {
                        from_date: { $lt: fromd },
                        to_date: { $gt: fromd },
                    },
                    {
                        from_date: { $lt: tod },
                        to_date: { $gt: tod },
                    },
                    {
                        from_date: { $gt: fromd },
                        to_date: { $lt: tod },
                    },
                ],
            },
          { cancel: 0 },
        ],
      });
      const carss = await cars.find({
        category: { $in: categories },
        company: { $in: brand },
        fuel_type: { $in: fuel },
        engine_type: { $in: eng },
        no_of_passengers: { $in: seats },
        city: req.body.city,
        color: { $in: color },
        lender_email: { $ne: email },
      });
  
      for (let index = 0; index < carss.length; index++) {
        let count = 0;
        for (let temp = 0; temp < bookings.length; temp++) {
          if (carss[index].carid != bookings[temp].carid) {
            count = count + 1;
          }
        }
        if (count == bookings.length) {
          finalcars.push(carss[index]);
        }
      }
      let tempdata = [];
      for (let index = 0; index < finalcars.length; index++) {
        const userdetail = await user.findOne({
          email: finalcars[index].lender_email,
        });
        const data = {
          cardeatails: finalcars[index],
          lenderdetails: {
            _id: userdetail._id,
            name: userdetail.name,
            email: userdetail.email,
            phone_no: userdetail.phone_no,
            address: userdetail.address,
            pincode: userdetail.pincode,
            city: userdetail.city,
          },
        };
        tempdata.push(data);
      }
      res.status(200).json(tempdata);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error in catch block" });
    }
};
  
module.exports.requestbooking = async(req, res)=> {
  try {
    await requestbookings.find({}, async(err, rb)=> {
      if (err) {
        return res.status(400).json({ message: "Server error" });
      }
      var bookingcount = rb.length + 1;
      var bookingid = "B" + bookingcount.toString();
      const pattern = date.compile("YYYY-MM-DD");
      var d1 = date.format(new Date(req.body.to_date), pattern);
      var d2 = date.format(new Date(req.body.from_date), pattern);
      const td = dayjs(req.body.to_date, "YYYY-MM-DD");
      const fm = dayjs(req.body.from_date, "YYYY-MM-DD");
      const days = td.diff(fm, "day");
      const finalrent = days * req.body.rent;
      const newrequestedbooking = new requestbookings({
        bookingid: bookingid,
        lender_email: req.body.lender_email,
        borrower_email: req.email,
        carid: req.body.carid,
        from_date: d2,
        to_date: d1,
        rent: finalrent,
        booking_status: -1, //-1: request pending, 1:request accepted, 0:request rejected
      });
      await newrequestedbooking.save(e=> {
        if (e) {
          console.log(`Error in processing request booking`);
          return res
            .status(404)
            .json({ message: "Error in processing request booking" });
        }
        res
          .status(200)
          .json({ message: "Successfully processed booking request" });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.cancelconfirmedbooking = async(req, res)=> {
  try {
    console.log(req.body.bookingid);
    await confirmedbookings.findOneAndUpdate(
      { bookingid: req.body.bookingid },
      { cancel: 1 }
    );
    
    res.status(200).json({ message: "Successfully cancelled booking" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.acceptrequestbooking = async(req, res)=> {
  try {
    console.log(req.body);
    const pattern = date.compile("YYYY-MM-DD");
    var d1;
    var d2;
    const rb = await requestbookings.findOne({ bookingid: req.body.bookingid });
    await requestbookings.findOneAndUpdate(
      { bookingid: req.body.bookingid },
      { booking_status: 1 }
    );
    d1 = date.format(new Date(rb.to_date), pattern);
    d2 = date.format(new Date(rb.from_date), pattern);
    const cb = new confirmedbookings({
      bookingid: rb.bookingid,
      lender_email: rb.lender_email,
      borrower_email: rb.borrower_email,
      carid: rb.carid,
      from_date: rb.from_date,
      to_date: rb.to_date,
      rent: rb.rent,
      trip_status: 0,
      cancel: 0,
    });
    await cb.save();
    const carss = await requestbookings.find({ carid: req.body.carid });
    console.log(carss);
    for (let index = 0; index < carss.length; index++) {
      if (carss[index].booking_status == -1) {
        var d3 = date.format(new Date(carss[index].to_date), pattern);
        var d4 = date.format(new Date(carss[index].from_date), pattern);
        if (
          (d2 < d3 && d3 < d1) ||
          (d2 < d4 && d4 < d1) ||
          (d4 < d2 && d3 > d2)
        ) {
          await requestbookings.findOneAndUpdate(
            { bookingid: carss[index].bookingid },
            { booking_status: 0 }
          );
        }
      }
    }
    return res.status(200).json({ message: "Booking request accepted" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.cancelrequestbooking = async(req, res)=> {
  try {
    await requestbookings.findOneAndUpdate(
      { bookingid: req.body.bookingid },
      { booking_status: 0 }
    );
    res.status(200).json({ message: "Successfully cancelled booking request" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.updateCarDetails = (req, res)=>{
  try {
    console.log(req.body);
    cars.findOne({ carid: req.body.carid }, async(err, result)=> {
      if (err || !result) {
        console.log(err);
        return res.status(400).json({ message: "server error" });
      }
      if (req.email != result.body.lender_email) {
        return res
          .status(200)
          .json({ message: "Car does not belong to this user" });
      }
      var finalcity;
      user.find({ email: req.email }, (err, user)=>{
        if (err || !user) {
          return res.status(400).json({ message: "Server Error" });
        }
        finalcity = user[0].city;
      });
      console.log(finalcity);
      const pattern = date.compile("YYYY-MM-DD");
      var tod = date.format(new Date(req.body.to), pattern);
      var fromd = date.format(new Date(req.body.from), pattern);
      result.pictures = req.body.croppedImage;
      result.registration_no = req.body.registration;
      result.rent = req.body.rent;
      result.deposite = req.body.deposit;
      result.company = req.body.company;
      result.modl = req.body.model;
      result.category = req.body.category;
      result.fuel_type = req.body.fuel;
      result.no_of_passengers = req.body.seats;
      result.color = req.body.color;
      result.engine_type = req.body.eng;
      result.features = req.body.features;
      result.to_date = tod;
      result.from_date = fromd;
      result.city = finalcity;
      await result.save();
      return res
        .status(200)
        .json({ message: "Car details updated successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

