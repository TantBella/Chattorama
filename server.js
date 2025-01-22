// require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

let messages = [];
let currentId = 1;

app.get("/api/messages", (req, res) => {
  res.json(messages);
  console.log("Welcome to my chat");
});

app.post("/api/messages", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400);
  }

  const newMessage = {
    id: currentId++,
    text,
    createdAt: new Date(),
  };
  messages.push(newMessage);
  res.status(200).json(newMessage);
});

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
