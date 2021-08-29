const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user_controller");
const verifytoken = require("../controllers/verifytoken");

router.post("/create", usercontroller.create);
router.post("/createsession", usercontroller.createSession);
router.get("/profile", verifytoken.verifyToken, usercontroller.profile);
router.get("/getaddedcar", verifytoken.verifyToken, usercontroller.getaddedcar);
router.get("/getrentedcar", verifytoken.verifyToken, usercontroller.getrentedcar);
router.get("/getlendedcar", verifytoken.verifyToken, usercontroller.getlendedcar);
router.get("/getrequestedcar", verifytoken.verifyToken, usercontroller.getrequestedcar);
router.post("/updateprofile", verifytoken.verifyToken, usercontroller.updateprofile);

module.exports = router;
