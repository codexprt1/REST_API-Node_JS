const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  os: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

exports.Product = mongoose.model("Order", orderSchema);
