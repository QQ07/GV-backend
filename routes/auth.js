// const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

require("dotenv").config();
// app.use(express.json());

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const verifySid = process.env.verifySid;
const client = require("twilio")(accountSid, authToken);
const friendlyName = "Global Vistar";

router.post("/sendOTP", (req, res) => {
  var { phoneNumber } = req.body;
  if (phoneNumber == undefined || phoneNumber.length != 10)
    res.json("Invalid phone Number");
  phoneNumber = "+91" + phoneNumber;
  console.log("Sending OTP to ", phoneNumber);
  client.verify.v2
    .services(verifySid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    .then((verification) => {
      console.log(verification);
      res.json("OTP sent!");
    });
});
router.post("/verifyOTP", (req, res) => {
  var { phoneNumber, code } = req.body;
  phoneNumber = "+91" + phoneNumber;
  // var response = verifyCode(phoneNumber, code);

  client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: phoneNumber, code: code })
    .then((response) => {
      // Object.assign(response, source);
      console.log(response);

      res.json(response);
    });
});

module.exports = router;
