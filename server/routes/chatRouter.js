const express = require('express');
const chatRouter = express.Router();
const { processUserMessage } = require('../utlis/dialogFlowUtils');

chatRouter.post("/api/v1/chat", async (req, res) => {
  const userMessage = req.body.message;
//message
  try {
    const botResponse = await processUserMessage(userMessage);

    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = chatRouter;
