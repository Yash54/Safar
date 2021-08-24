const User = require("../models/user");
const jwt = require("jsonwebtoken");
const date = require("date-and-time");
const bcrypt = require("bcryptjs");

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