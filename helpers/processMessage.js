// You can find your project ID in your Dialogflow agent settings
const projectId = "js-react-todo-0002";
const sessionId = "tvqXxWYhNoyIZONvFYYXwcvjuxjCZRAt7seu"
const query = "hello";
const languageCode = "en-US";

// Instantiate a DialogFlow client
const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
    session: sessionPath,
    queryInput: {
        text: {
            text: query,
            languageCode: languageCode
        }
    }
};

// Send request and log result
sessionClient
    .detectIntent(request)
        .then(responses => {
            console.log("Detected intent");
            console.log(request);
            console.log(responses);
            const result = responses[0].queryResult;
            console.log(` Query: ${result.queryText}`);
            console.log(` Response: ${result.fulfillmentText}`);
            if (result.intent) {
                console.log(` Intent: ${result.intent.displayName}`);
            } else {
                console.log(` No intent matched.`);
            }
        })
        .catch(err => {
            console.log('ERROR:', err);
        });