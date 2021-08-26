const cars = require("../models/car");
const confirmedbookings = require("../models/confirmedBooking");
const date = require("date-and-time");
const user = require("../models/user");


// const asyncForEach = async (array, callback) => {
//     for (let index = 0; index < array.length; index++) {
//       await callback(array[index], index, array);
//     }
// };

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
  