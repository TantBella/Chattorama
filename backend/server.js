const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

let messages = [];
let currentId = 1;

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Meddelandet kan inte vara tomt" });
  }

  const newMessage = {
    id: currentId++,
    text,
    createdAt: new Date(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
