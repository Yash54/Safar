const User = require("../models/user");
const jwt = require("jsonwebtoken");
const date = require("date-and-time");
const bcrypt = require("bcryptjs");
const Car = require("../models/car");
const ConfirmedBooking = require("../models/confirmedBooking");
const RequestedBooking = require("../models/requestBooking");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
};

module.exports.create = async(req, res)=> {
  console.log(req.body);
  try {
      var salt;
      var hashpwd;
      try {
        salt = await bcrypt.genSalt(10);
        hashpwd = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.log(error);
      }
      console.log(hashpwd);
      const user_add = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd,
        phone_no: req.body.phone_no,
        address: req.body.address,
        pincode: req.body.pincode,
        city: req.body.city,
      });

      User.create(user_add, async (err) =>{
        if (err) {
          console.log(`Error in adding the user to database`);
          console.log(err);
          return res
            .status(404)
            .json({ message: "error in adding user to db" });
        }
        console.log(`User Successfully created`);
        return res.status(200).json({ message: "User successfully created" });
      });
  } catch (err) {
    console.log(`Error in db connection`);
    return res.status(404).json({ message: "Error in db connection" });
  }
};

module.exports.createSession = async(req, res)=> {
  try {
    User.findOne({ email: req.body.email }, async(err, user)=> {
      if (!user || err) {
        console.log(`User doesnt exist`);
        return res.status(404).json({ message: "User doesn't exist" });
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(404).json({ message: "Invalid Password" });
      }
      var token = jwt.sign({ id: user._id, email: user.email }, "Safar", {
        expiresIn: 86400, // expires in 24 hours
      });
      return res.status(200).json({ id: user._id, accessToken: token });
    });
  } 
  catch (err) {
    console.log(`Error in db connection`);
    res.status(404).json({ message: "Error in db connection" });
  }
};


module.exports.profile = async(req, res, next)=> {
  console.log(req.userId);
  console.log(req.email);
  try {
    User.findById(req.userId, async(err, user)=> {
      if (!user || err) {
        console.log(`User doesn't exist`);
        return res.status(404).json({ message: `User doesn't exist` });
      }
      console.log(req.userId);
      res.status(200).json({
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
      });
    });
  } catch (err) {
    console.log("Error in db connection");
    res.status(404).json({ message: "Error in db connection" });
  }
};

module.exports.getaddedcar = async(req, res)=> {
  try {
    await Car.find({ lender_email: req.email }, async(err, car)=>{
      if (err || !car) {
        return res.status(400).json({ message: "Server Error" });
      }
      return res.status(200).json(car);
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getrentedcar = async(req, res)=> {
  try {
    const answer = [];
    const pattern = date.compile("YYYY-MM-DD");
    const d1 = date.format(new Date(), pattern);
    const car = await ConfirmedBooking.find({ borrower_email: req.email });
    for (let index = 0; index < car.length; index++) {
      var fromd = date.format(new Date(car[index].from_date), pattern);
      var tod = date.format(new Date(car[index].to_date), pattern);
      if (tod < d1) {
        car[index].trip_status = 1;  //trip over
      } else if (d1 < fromd) {
        car[index].trip_status = 0;  //trip remaining
      } else {
        car[index].trip_status = -1; //ongoing trip
      }
      const temp_car = await Car.findOne({ carid: car[index].carid });
      const temp_borrower = await User.findOne({
        email: car[index].borrower_email,
      });
      const temp_lender = await User.findOne({
        email: car[index].lender_email,
      });
      const temp_result = {
        booking_details: car[index],
        car_details: temp_car,
        borrower_details: temp_borrower,
        lender_details: temp_lender,
      };
      answer.push(temp_result);
    }
    return res.status(200).json(answer);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getlendedcar = async(req, res)=> {
  try {
    const answer = [];
    const pattern = date.compile("YYYY-MM-DD");
    const d1 = date.format(new Date(), pattern);
    const car = await ConfirmedBooking.find({ lender_email: req.email });
    for (let index = 0; index < car.length; index++) {
      var fromd = date.format(new Date(car[index].from_date), pattern);
      var tod = date.format(new Date(car[index].to_date), pattern);
      if (tod < d1) {
        car[index].trip_status = 1; //trip completed
      } else if (d1 < fromd) {
        car[index].trip_status = 0; //trip remaining
      } else {
        car[index].trip_status = -1; //ongoing trip
      }
      const temp_car = await Car.findOne({ carid: car[index].carid });
      const temp_borrower = await User.findOne({
        email: car[index].borrower_email,
      });
      const temp_lender = await User.findOne({
        email: car[index].lender_email,
      });
      const temp_result = {
        booking_details: car[index],
        car_details: temp_car,
        borrower_details: temp_borrower,
        lender_details: temp_lender,
      };
      answer.push(temp_result);
    }
    res.status(200).json(answer);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.getrequestedcar = async(req, res)=> {
  try {
    const answer1 = [];
    const answer2 = [];
    const pattern = date.compile("YYYY-MM-DD");
    const d1 = date.format(new Date(), pattern);

    const lender_car = await RequestedBooking.find({ lender_email: req.email });
    for (let index = 0; index < lender_car.length; index++) {
      const tempcar = await Car.findOne({ carid: lender_car[index].carid });
      const temp_borrower = await User.findOne({
        email: lender_car[index].borrower_email,
      });
      const temp_lender = await User.findOne({
        email: lender_car[index].lender_email,
      });
      const temp_result = {
        booking_details: lender_car[index],
        car_details: tempcar,
        borrower_details: temp_borrower,
        lender_details: temp_lender,
      };
      answer1.push(temp_result);
    }

    const borrow_car = await RequestedBooking.find({
      borrower_email: req.email,
    });
    for (let index = 0; index < borrow_car.length; index++) {

      const tempcar = await Car.findOne({
        carid: borrow_car[index].carid,
      });
      const temp_borrower = await User.findOne({
        email: borrow_car[index].borrower_email,
      });
      const temp_lender = await User.findOne({
        email: borrow_car[index].lender_email,
      });
      const temp_result = {
        booking_details: borrow_car[index],
        car_details: tempcar,
        borrower_details: temp_borrower,
        lender_details: temp_lender,
      };
      answer2.push(temp_result);
    }
    const result = {
      lendedby: answer1,
      borrowedby: answer2,
    };
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

module.exports.updateprofile =(req, res)=>{
  try {
    console.log(req.body);
    User.findOne({ email: req.email }, async(err, user)=> {
      if (err || !user) {
        console.log(err);
        return res.status(400).json({ message: "server error" });
      }
      user.name = req.body.fullName;
      user.phone_no = req.body.phoneNumber;
      user.address = req.body.address;
      user.city = req.body.city;
      user.pincode = req.body.pincode;
      await user.save();
      return res
        .status(200)
        .json({ message: "User profile updated successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in catch block" });
  }
};

