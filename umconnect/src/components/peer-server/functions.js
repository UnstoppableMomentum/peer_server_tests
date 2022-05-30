import {
callConnected,
_callStart
} from '../call/actions'

import {
    connected,
    error,
    disconnect,
    registered,
} from "./actions"

import {
    handleAnswer,
    handleCandidate,
    handleOffer
} from '../webrtc/webrtc'

const W3CWebSocket = require('websocket').w3cwebsocket;

const MSG_OFFER = "offer";
const MSG_ANSWER = "answer";
const MSG_CANDIDATE = "candidate";
const MSG_BYE = "bye";
const MSG_BUSY = "busy";
const MSG_REGECT = "reject";

const DEFAULT_URL_SERVER_WSS = 'wss://localhost:8484';

let webSocket = null;

export function connectAndSignIn(dispatch, urlServer, localName) {
    try {

        const urlServer_ = (urlServer && urlServer.length > 0) ? urlServer : DEFAULT_URL_SERVER_WSS;
        webSocket = new W3CWebSocket(urlServer_, 'echo-protocol');

        webSocket.onopen = (event => {

            dispatch(connected(webSocket));

            webSocket.send(
                JSON.stringify({
                    cmd: 1,
                    data: {
                        id: localName
                    }
                })
            );
        });

        webSocket.onmessage = (event => {
            onWebSocketMessage(dispatch, event.data);
        });

        webSocket.onclose = (event => {
            console.log("onclose %o", event);
        });
    } catch (e) {
        console.error("error: %o", e);
    }
}

export function sendMessage(to, msg) {
    webSocket.send(
        JSON.stringify({
            cmd: 3,
            data: { to, msg }
        })
    );
}

export function sendMessageICE(peer_id, event) {
    console.log('send ICE peer_id: %o', peer_id);
    sendMessage(peer_id, JSON.stringify({
        type: MSG_CANDIDATE,
        sdpMLineIndex: event.candidate.sdpMLineIndex,
        sdpMid: event.candidate.sdpMid,
        candidate: event.candidate.candidate
    }));
}

export function sendMessageBye(peer_id) {
    sendMessage(peer_id, JSON.stringify({ type: MSG_BYE }));
}

export function sendMessageBusy(peer_id) {
    sendMessage(peer_id, JSON.stringify({ type: MSG_BUSY }));
}

export function sendMessageReject(peer_id) {
    sendMessage(peer_id, JSON.stringify({ type: MSG_REGECT }));
}

function onRemoteHangup(dispatch) 
{
    console.log('@@@ onRemoteHangup');    
}

export function onWebSocketMessage(dispatch, message) {
    try {
        const objMessage = JSON.parse(message);
        const { from, msg, res, data } = objMessage;
        if (res) {
            if (parseInt(res) === 0) {
                if (data) {
                    const { cmd } = data;
                    if (cmd) {
                        const intCmd = parseInt(cmd);
                        switch (intCmd) {
                            case 1:
                                dispatch(registered(data));
                                break;
                            default:
                                break;
                        }
                    }
                }
            } else {
                console.error("The server responded with error %o %o:", res, data ? data : '');
            }
        } else if (msg) {
            processSignalingMessage(dispatch, from, msg);
        } else {
            console.error("Invalid peer server response %o :", data);
        }
    } catch (e) {
        console.error("error: %o", e);
    }
}

export function processSignalingMessage(dispatch, from, message) {
    if (message.length <= 0) {
        return;
    }
    var msg = JSON.parse(message);
    if (msg.type === MSG_OFFER) {
        dispatch(_callStart());
        handleOffer(dispatch, from, msg);
    } else if (msg.type === MSG_ANSWER) {
        handleAnswer(dispatch, msg);
    } else if (msg.type === MSG_CANDIDATE) {
        handleCandidate(dispatch, msg);
    } else if (msg.type === MSG_BYE) {
        onRemoteHangup(dispatch);
    } else if (msg.type === MSG_BUSY) {
        //TODO
    } else if (msg.type === MSG_REGECT) {
        //TODO
    }
}