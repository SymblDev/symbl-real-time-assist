import {apiBase, intents, symblAppId, symblAppSecret, summaryEmails, twilioBridgeSubscriptionUrl} from "../config";
import request from "request";
import { uuid } from 'uuidv4';
import { Symbl, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";
import sdk from "symbl-node/build/client.sdk.min";
import WebSocket from "../websocket/WebSocket";
const clientSDK = new window.ClientSDK();


const symbl = new Symbl({
    appId: symblAppId,
    appSecret: symblAppSecret
});

let stopEndpointTimeoutRef = null;

export const generateAccessToken = () => {
    return new Promise((resolve, reject) => {
        let accessToken;
        const authOptions = {
            method: 'post',
            url: "https://api.symbl.ai/oauth2/token:generate",
            body: {
                type: "application",
                appId: symblAppId,
                appSecret: symblAppSecret
            },
            json: true
        };

        request(authOptions, (err, res, body) => {
            if (err) {
                console.error('error posting json: ', err);
                reject(err);
                throw err
            }
            accessToken=body.accessToken;
            console.log("Generated accesstoken "+accessToken);
            console.log(JSON.stringify(body, null, 2));
            resolve(accessToken)
        });
    });
}

export const startRealTimeRequest = async (name) => {

    // Boilerplate code for creating a new AudioContext and MediaStreamAudioSourceNode
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    const sampleRate = stream.getAudioTracks()[0].getSettings().sampleRate;
    const context = new AudioContext({ sampleRate });
    const sourceNode = context.createMediaStreamSource(stream);

    // Creating a new AudioStream
    const audioStream = new LINEAR16AudioStream(sourceNode);

    const connection = await symbl.createAndStartNewConnection({
        insightTypes: ["question", "action_item", "follow_up"],
        config: {
            meetingTitle: 'My Demo Meeting',
            confidenceThreshold: 0.7,
            timezoneOffset: 480, // Offset in minutes from UTC
            languageCode: 'en-US',
            sampleRateHertz: sampleRate
        },
        speaker: {
            name: name
        }
    }, audioStream);

    return connection;
}

export const stopRealTimeRequest = async (connection) => {
    try {
        // Stops processing audio, but keeps the WebSocket connection open.
      await connection.stopProcessing();

      // Closes the WebSocket connection.
      connection.disconnect();
    } catch (e) {
        console.error('Error while stopping the connection.', e);
    }
}

export const startEndpoint = async (phoneNumber, callback, endCallAfterInSeconds = 300) => {
    try {
        await clientSDK.init({
            appId: symblAppId,
            appSecret: symblAppSecret,
            basePath: apiBase
        });

        ///get accesstoken
        let accessToken;
        const authOptions = {
            method: 'post',
            url: "https://api.symbl.ai/oauth2/token:generate",
            body: {
                type: "application",
                appId: symblAppId,
                appSecret: symblAppSecret
            },
            json: true
        };

        request(authOptions, (err, res, body) => {
            if (err) {
                console.error('error posting json: ', err);
                throw err
            }
            accessToken=body.accessToken;
            console.log("accesstoken"+accessToken);
            console.log(JSON.stringify(body, null, 2));
        });
        ///received accesss token



        const connection = await clientSDK.startEndpoint({
            endpoint: {
                type: 'pstn',
                phoneNumber
            },
            intents,
            actions: [{
                "invokeOn": "stop",
                "name": "sendSummaryEmail",
                "parameters": {
                    "emails": summaryEmails // Add array of emails to which the email is to be sent at the end of the call
                }
            }],
            data: {
                session: {
                    name: `Live Intent Detection Demo - ${phoneNumber}` // Title of the Meeting, this will be reflected in summary email if configured.
                }
            }
        }, callback);

        const connectionId = connection.connectionId;
        console.log('Call established for connectionId: ' + connectionId);
        console.log(connection.conversationId);
        console.log(connection.summaryInfo);
       /* //// make a request to get summary ui
        let summary='';

        request.post({
            url: 'http://api.symbl.ai/v1/conversations/'+connection.conversationId+'/experiences',
            headers: {
                'x-api-key': accessToken,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "name": "verbose-text-summary",
                "logo": "https://symblsanitydataset.s3.us-east-2.amazonaws.com/googleImage.webp",


            }),
        }, (err, response, body) => {
            console.log(body);
            console.log("body url from response"+(JSON.parse(body)).url);
            summary=(JSON.parse(body)).url;
            ///set global variable surl have summary url
            window.$surl=summary;
            console.log("name attribute set"+window.$surl);
        });
        /////*/



        stopEndpointTimeoutRef = setTimeout(async () => {
            clearTimeout(stopEndpointTimeoutRef);
            stopEndpointTimeoutRef = null;
            await stopEndpoint(connectionId);
        }, endCallAfterInSeconds * 1000);

        return connectionId;
    } catch (e) {
        console.error('Error in establishing startEndpoint call with SDK', e);
        throw e;
    }
};

export const stopEndpoint = async (connectionId) => {
    console.log('Stopping connection for ' + connectionId);

    if (stopEndpointTimeoutRef) {
        clearTimeout(stopEndpointTimeoutRef);
        stopEndpointTimeoutRef = null;
    }

    try {
        const connection = await clientSDK.stopEndpoint({
            connectionId
        });

        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
        //window.$surl=connection.summaryInfo[0].url;

        return {
            summaryInfo: connection.summaryInfo,
            conversationId: connection.conversationId
        };
    } catch (e) {
        console.error('Error while stopping the connection.', e);
        throw e;
    }
};

export const getAnalytics = async (conversationId) => {
    const accessToken = await generateAccessToken();
    const options = {
        method: 'get',
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
        json: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                console.error('error while fetching analytics: ', err);
                reject(err);
            }
            const {members, metrics} = body;
            console.log("members, metrics ", members, metrics);
            resolve({members, metrics});
        });
    });
}

export const getMessagesWithSentiment = async (conversationId) => {
    const accessToken = await generateAccessToken();
    const options = {
        method: 'get',
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`,
        json: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                console.error('error while fetching analytics: ', err);
                reject(err);
            }
            const {messages} = body;
            console.log("messages", messages);
            resolve(messages);
        });
    });
}

export const getSummary = async (conversationId) => {
    const accessToken = await generateAccessToken();
    const options = {
        method: 'get',
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/summary?refresh=true`,
        json: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                console.error('error while fetching summary: ', err);
                reject(err);
            }
            const summary = body.summary;
            console.log("Generated summary ", summary);
            resolve(summary);
        });
    });
}

export const getComprehensiveActionItems = async (conversationId) => {
    const accessToken = await generateAccessToken();
    const options = {
        method: 'get',
        url: `https://api-labs.symbl.ai/v1/conversations/${conversationId}/comprehensive/action-items`,
        json: true,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                console.error('error while fetching summary: ', err);
                reject(err);
            }
            const comprehensiveActionItems = body.actionItems;
            console.log("Comprehensive Action Items ", comprehensiveActionItems);
            resolve(comprehensiveActionItems);
        });
    });
}

export const subscribeToConnection = async (connectionId, onUpdate) => {
    if (!connectionId) {
        throw "'connectionId' parameter is mandatory.";
    }
    if (!onUpdate || typeof onUpdate !== 'function') {
        throw "'onUpdate' parameter must be a valid function.";
    }

    const accessToken = await generateAccessToken();

    return new Promise((resolve, reject) => {
        return new WebSocket({
            url: `${apiBase.replace('http', 'ws')}/v1/subscribe/${connectionId}?access_token=${accessToken}`,
            onError: (e) => {
                console.error(`Error while subscribing to to Symbl connection: ${connectionId}`, e);
                reject(e);
            },
            onConnect: (c) => {
                console.log(`Subscribed to Symbl Connection: ${connectionId}.`, c);
                resolve(c);
            },
            onMessage: (_data) => {
                const data = JSON.parse(_data);
                // console.log('Message from Twilio Bridge', data);
                onUpdate(data);
            }
        });
    });

};
