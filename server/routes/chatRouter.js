const express = require('express');
const chatRouter = express.Router();
const { processUserMessage } = require('../utlis/dialogFlowUtils');

chatRouter.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Ensure that a message is provided
    if (!userMessage) {
      return res.status(400).json({ message: 'Bad Request: Missing message' });
    }

    const botResponse = await processUserMessage(userMessage);

    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = chatRouter;