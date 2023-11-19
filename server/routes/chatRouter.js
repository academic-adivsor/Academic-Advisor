const express = require("express");
const chatRouter = express.Router();
const { processUserMessage } = require("../utlis/dialogFlowUtils");
const serviceAccount = require('../../parker-pslk-7df273a4b799.json');

// Function to generate a session ID
const generateSessionId = () => {
  // Generate a unique session ID using a library or any method of your choice
  // For simplicity, you can use a timestamp or a random string
  return Date.now().toString();
};

chatRouter.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Ensure that a message is provided
    if (!userMessage) {
      return res.status(400).json({ message: 'Bad Request: Missing message' });
    }

    // Generate a session ID
    const sessionId = generateSessionId();

    // Process user message with the generated session ID
    const botResponse = await processUserMessage(userMessage, sessionId, serviceAccount);

    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = chatRouter;