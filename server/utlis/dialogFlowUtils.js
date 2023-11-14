const { SessionsClient } = require('@google-cloud/dialogflow');

const processUserMessage = async (userMessage, sessionId, serviceAccount) => {
  console.log('userMessage:', userMessage);
  console.log('sessionId:', sessionId);
  console.log('serviceAccount:', serviceAccount)
  const sessionClient = new SessionsClient({ credentials: serviceAccount });
  const session = sessionClient.projectAgentSessionPath('parker-pslk', sessionId);
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