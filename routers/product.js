const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }
  const product = await new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product.save();
  if (!product) {
    res.status(400).send("The product can not be created");
  } else {
    res.send(product);
  }
});

router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).send("Invalid Category");
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );
  if (!product) {
    res.status(500).send("product can not be updated");
  }
  res.send(product);
});

router.get("/get/featured", async (req, res) => {
  const products = await Product.find({ isFeatured: true });

  if (!products) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(products);
});

module.exports = router;
