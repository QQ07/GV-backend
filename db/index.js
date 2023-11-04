const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: Number,
  name: String,
  email: String,
  JoinedAs: String,
});

const product = new mongoose.Schema({
  nameOfProduct: String,
  moq1: Number,
  ppp1: Number,
  moq2: Number,
  ppp2: Number,
  moq3: Number,
  ppp3: Number,
  verified: Boolean,
});
const productDetails = new mongoose.Schema({
  phoneNumber: String,
  Pname: String,
  LeadTimeInDays: String,
  YearPresence: String,
  shipping: String,
  RnR: String,
  storage: String,
  Sampling: String,
  TPM: String,
  productLife: String,
  manufacturingPlace: String,
  capacity: String,
  productType: String,
  productSize: String,
});
const finalProducts = new mongoose.Schema({
  productName: String,
  imageLink: String,
  price: String,
  MoQ: String,
  margin: String,
});

const User = mongoose.model("User", userSchema);
const Products = mongoose.model("Products", product);
const ProductDetails = mongoose.model("ProductDetails", productDetails);
const FinalProducts = mongoose.model("FinalProducts", finalProducts);
module.exports = {
  User,
  Products,
  ProductDetails,
  FinalProducts,
};
