const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const accountSid = "AC3876eee03c186a96197e793901d801a3";
const authToken = "a34d0c345f8a8c9d8e61a00b92531efb";
const verifySid = "VA96a578591066801d90d2dee7940a207f";
const client = require("twilio")(accountSid, authToken);
const friendlyName= "Global Vistar"

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendOTP", (req, res) => {
  var { phoneNumber } = req.body;
  phoneNumber = "+91" + phoneNumber;
  console.log("OTP sent to ", phoneNumber);
  client.verify.v2
    .services(verifySid)
    .verifications.create({ friendlyName:friendlyName,to: phoneNumber, channel: "sms" })
    .then((verification) => {
      console.log(verification);
      res.json("OTP sent!");
    });
});
app.post("/verifyOTP", (req, res) => {
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

app.listen(process.env.PORT || 80, () => {
  console.log(`App listening on port http://localhost:80`);
});
