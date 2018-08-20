const api_ai_token = process.env.API_AI_TOKEN;
const apiAiClient = require('apiai')(api_ai_token);

const facebook_access_token = process.env.FACEBOOK_ACCESS_TOKEN;
const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v3.1/me/messages',
        qs: {
            access_token: facebook_access_token
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: { text }
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {
        sessionId: 'crowdbotic_bot'
    });

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        sendTextMessage(senderId, result);
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};