const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.options("*", cors()); // allowing every request to pass any origin

require("dotenv/config");
const port = process.env.PORT;

//Routes
const categoriesRouter = require("./routers/category");
const productsRouter = require("./routers/product");
const usersRouter = require("./routers/user");
const ordersRouter = require("./routers/order");

//middleWares
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(morgan("tiny")); //display the log request in specific format

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/orders", ordersRouter);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("<Database Paired /> ");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(`running on ${port}`);
});
