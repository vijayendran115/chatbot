const dialogflow = require('dialogflow');
const uuid = require('uuid');
const { GOOGLE_PROJECT_ID, GOOGLE_PRIVATE_TOKEN, GOOGLE_CLIENT_EMAIL } = process.env;

detectIntent = async (message) => {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(GOOGLE_PROJECT_ID, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  return await sessionClient.detectIntent(request)
    .then((result) => {
      return result;
    })
    .catch((e) => {
      throw e;
    });

  // console.log('Detected intent');
  
  // const result = responses[0].queryResult;
  
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentText}`);
  
  // if (result.intent) {
  //   console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log(`  No intent matched.`);
  // }

};

module.exports = {
    detectIntent
};