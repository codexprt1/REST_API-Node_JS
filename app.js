const express = require("express");
const app = express();

require("dotenv/config");

const port = process.env.PORT;

app.get("/api/v1/products", (req, res) => {
  res.json({
    msg: "Hello API",
  });
});

app.listen(3000, () => {
  console.log(`running on ${port}`);
});
