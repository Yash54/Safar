const express = require("express");
const router = express.Router();
const carcontroller = require("../controllers/car_controller");
const verifytoken = require("../controllers/verifytoken");

router.post("/addcar", verifytoken.verifyToken, carcontroller.addcar);
router.post("/filter", carcontroller.filter);

module.exports = router;
