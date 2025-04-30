// chatRoutes.js (create inside ./src/Routes/)
const express = require("express");
const router = express.Router();
const Chat = require("../models/ChatModel");

// Save message to DB
router.post("/chat", async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const chat = new Chat({ from, to, message });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// chatRoutes.js (admin fetching all messages)
router.get("/chat/admin", async (req, res) => {
    try {
      // Fetch all messages sent to the admin
      const messages = await Chat.find({ to: "admin1@gmail.com" }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
