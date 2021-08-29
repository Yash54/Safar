const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");
const verifytoken = require("../controllers/verifytoken");

router.post("/addcar", verifytoken.verifyToken, carcontroller.addcar);
router.post("/filter", carcontroller.filter);
router.post("/requestbooking", verifytoken.verifyToken, carcontroller.requestbooking);
router.post("/cancelrequestbooking",verifytoken.verifyToken,carcontroller.cancelrequestbooking);
router.post("/acceptrequestbooking",verifytoken.verifyToken,carcontroller.acceptrequestbooking);
router.post("/editcardetails", verifytoken.verifyToken, carcontroller.updateCarDetails);
router.post("/cancelconfirmedbooking", verifytoken.verifyToken, carcontroller.cancelconfirmedbooking); 

module.exports = router;
