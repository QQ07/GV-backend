const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
require("dotenv").config();

const MongoPassword = process.env.MongoPassword;
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Global Vistar Backend");
});

mongoose.connect(
  `mongodb+srv://symblesolutions:${MongoPassword}@cluster0.wsgyalp.mongodb.net/live`
);
app.listen(process.env.PORT || 3001, () => {
  console.log(`App listening on port http://localhost:3001`);
});
