const { SessionsClient } = require('dialogflow');
const serviceAccount = require('../../dialogflow-credentials.json');

const processUserMessage = async (userMessage, sessionId, serviceAccount) => {
  const sessionClient = new SessionsClient({ credentials: serviceAccount });
  const session = sessionClient.sessionPath('parker-pslk', sessionId);
  const queryInput = {
    text: {
      text: userMessage,
      languageCode: 'en-US',
    },
  };
  
  try {
    const responses = await sessionClient.detectIntent({ session, queryInput });
    return responses[0].queryResult.fulfillmentText;
  } catch (error) {
    console.error('Error:', error);
    return 'Oops! Something went wrong. Please try again.'; // Default error message
  }
};

module.exports = { processUserMessage };