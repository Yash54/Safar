const nodemailer = require("nodemailer");
require("dotenv").config();

let nodemailerTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: String(process.env.EMAIL),
    pass: String(process.env.APPLICATION_PASSWORD),
  },
});

exports.sendEmail = function (email, secretCode, callback) {
  let options = {
    from: String("Account Confirmation OTP " + process.env.EMAIL),
    to: email,
    subject: "Your Safar Verification OTP",
    text: `This is your One Time Password(OTP)  '${secretCode}'  only valid for 5 mins`,
  };
  nodemailerTransporter.sendMail(options, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(error, info);
  });
};
