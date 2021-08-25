const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user_controller");

router.post("/create", usercontroller.create);
router.post("/createsession", usercontroller.createSession);

module.exports = router;
