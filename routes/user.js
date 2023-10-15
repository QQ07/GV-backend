const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Products, ProductDetails } = require("../db");
const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.number });
  console.log(user);
  if (!user) {
    res.status(403).json({ msg: "User doesn't exist" });
    return;
  }
  res.json({
    user,
  });
});

router.post("/signup", async (req, res) => {
  const { phoneNumber, name, email, registerAs } = req.body;
  console.log(name);
  const user = await User.findOne({ phoneNumber });
  if (user) {
    console.log(user);
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      phoneNumber,
      name,
      email,
      JoinedAs: registerAs,
    });
    await newUser.save();
    const token = jwt.sign({ phoneNumber, role: "user" }, SECRET, {
      expiresIn: "10h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  console.log(phoneNumber + "trying to login");
  if (user) {
    const token = jwt.sign({ phoneNumber, role: "user" }, SECRET, {
      expiresIn: "10h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.post("/check", async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  console.log("checking" + user);
  if (user) {
    res.status(200).json({ message: "Exists" });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
//addProduct route expects body to be in this form
// title: String,
// description: String,
// price: Number,
// moq: Number,
async function addProductToDB(newProduct) {
  newProduct.verified = false;
  const product = new Products(newProduct);
  await product.save();
  if (product._id) return 1;
}
router.post("/addProduct", async (req, res) => {
  console.log("adding product", req.body);
  req.body.verified = false;
  const product = new Products(req.body);
  product.save();
  // if (product._id) return 1;
  // let check = addProductToDB(req.body);
  // if (check !== 1) res.json({ message: "Unable to add product" });
  res.json({ message: "Product added successfully" });
});

router.post("/ProductDetails", async (req, res) => {
  // const products = req.body;
  console.log("here");
  console.log(req.body);
  const productd = new ProductDetails(req.body);
  productd.save();
  res.json("hello");
});
router.post("/addProducts", authenticateJwt, async (req, res) => {
  try {
    const products = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).send("Products should be a non-empty array.");
    }
    for (const product of products) {
      product.verified = false;
    }

    const savedProducts = await Products.insertMany(products);

    res.status(201).json(savedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/products", authenticateJwt, async (req, res) => {
  const products = await Products.find({ verified: true });
  console.log(products);
  res.json({ products });
});

router.post("/products/:productID", authenticateJwt, async (req, res) => {
  const product = await Products.findById(req.params.productID);
  console.log(product);
  if (product) {
    const product = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedproducts.push(product);
      await user.save();
      res.json({ message: "product purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

router.get("/purchasedproducts", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedproducts"
  );
  if (user) {
    res.json({ purchasedproducts: user.purchasedproducts || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
