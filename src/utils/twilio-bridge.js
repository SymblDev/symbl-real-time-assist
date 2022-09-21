import WebSocket from '../websocket/WebSocket';
import {twilioBridgeSubscriptionUrl} from "../config";

export const subscribeToUpdates = async (onUpdate) => {
    if (!onUpdate || typeof onUpdate !== 'function') {
        throw "'onUpdate' parameter must be a valid function.";
    }

    return new Promise((resolve, reject) => {
        return new WebSocket({
            url: twilioBridgeSubscriptionUrl,
            onError: (e) => {
                console.error('Connected to Twilio Bridge.', e);
                reject(e);
            },
            onConnect: (c) => {
                console.log('Connected to Twilio Bridge.', c);
                resolve(c);
            },
            onMessage: (_data) => {
                const data = JSON.parse(_data);
                console.log('Message from Twilio Bridge', data);
                onUpdate(data);
            }
        });
    });

};
