require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my chat");
});

app.listen(PORT, () => {
  console.log("listening to 3000");
});
