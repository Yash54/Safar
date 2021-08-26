const express = require('express');
const router = express.Router();

router.use('/user',require('./users'));
router.use('/car',require('./cars'));

module.exports=router;