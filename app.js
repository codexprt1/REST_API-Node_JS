const express = require("express");
const app = express();

require("dotenv/config");

const port = process.env.PORT;

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get("/api/v1/products", (req, res) => {
  const product = {
    id: 0,
    name: "Laptop",
    os: "Linux",
  };
  res.json({
    product,
  });
});

app.post("/api/v1/products", (req, res) => {
  const newProduct = req.body;
  console.log("NEW", newProduct);
  res.json({
    newProduct,
  });
});

app.listen(3000, () => {
  console.log(`running on ${port}`);
});
