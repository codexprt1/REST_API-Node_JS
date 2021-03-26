const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(userList);
});

router.post("/", async (req, res) => {
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    hashedPassword: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user.save();
  if (!user) {
    res.status(400).send("user not created");
  }
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    res.status(400).send("user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      user: user.email,
      token,
      message: "User Authenticated and token added",
    });
  } else {
    res.status(400).json({
      message: "Password is wrong",
    });
  }
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({
    userCount,
  });
});

module.exports = router;
