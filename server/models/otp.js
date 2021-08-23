const mongoose = require('mongoose');
const db = require("../config/mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 600,
    }
});

const Otp = mongoose.model('Otp',otpSchema);

// const otp1= new Otp({
//     email: "bat@wayne.com",
//     code: "Ab123"
// });
// otp1.save();

module.exports=Otp;