const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: Number,
  name: String,
  email: String,
  JoinedAs: String,
});

const product = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  moq: Number,
});

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Products", product);

module.exports = {
  User,
  Products,
};
