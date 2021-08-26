const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");

router.post("/filter", carcontroller.filter);

module.exports = router;
