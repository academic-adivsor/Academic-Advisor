const express = require('express');
const router = express.Router();
const { processUserMessage } = require('../utlis/dialogFlowUtils'); // Make sure the path is correct

router.post('/api/v1/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const botResponse = await processUserMessage(userMessage);

    res.json({ message: botResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
