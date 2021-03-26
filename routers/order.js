const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });

  if (!orderList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(orderList);
});

router.post("/", async (req, res) => {
  const orderItemsId = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );
  const orderItemsIdResolved = await orderItemsId;
  console.log("---", orderItemsIdResolved);

  const order = await new Order({
    orderItems: orderItemsIdResolved,
    shippingAddress: req.body.shippingAddress,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
  });
  order.save();
  if (!order) {
    res.status(400).json({
      success: false,
      message: "not saved",
    });
  }
  res.status(200).json({
    order,
    message: "order saved successfully",
  });
});

module.exports = router;
