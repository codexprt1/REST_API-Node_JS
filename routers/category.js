const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  const category = await new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category.save();
  if (!category) return res.status(404).send("category creation failed");

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "Category Deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        err,
      });
    });
});

module.exports = router;
