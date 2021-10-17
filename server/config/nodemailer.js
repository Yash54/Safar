const nodemailer = require("nodemailer");
require("dotenv").config();

let nodemailerTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'safar.site005@gmail.com',
    pass: 'krishil007'
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.sendEmail = function (email, secretCode, callback) {
  let options = {
    from: String("Account Confirmation OTP " + "safar.site005@gmail.com"),
    to: email,
    subject: "Your Safar Verification OTP",
    text: `This is your One Time Password(OTP)  '${secretCode}'  only valid for 5 mins`,
  };
  nodemailerTransporter.sendMail(options, (error, info) => {
    if (error) {
      return callback(error);
    }lback(error, info);
  });
};



