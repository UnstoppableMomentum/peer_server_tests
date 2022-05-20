import {
    PEER_SERVER_CONNECTED,
    PEER_SERVER_REGISTERED,
    PEER_SERVER_DISCONNECTED,
    PEER_SERVER_START_CONNECTION,
    PEER_SERVER_ERROR
} from "./actionTypes";

import { connectAndSignIn } from './functions'

export function connectPeerServer(dispatch, urlServer, localName) {
  connectAndSignIn(dispatch, urlServer, localName);
  return dispatch(connect());
}

export function connect() {
    return {
        type: PEER_SERVER_START_CONNECTION,
    };
}

export function connected(webSocket) {
    return {
        type: PEER_SERVER_CONNECTED,
        payload: webSocket
    };
}

export function registered(data) {
    return {
        type: PEER_SERVER_REGISTERED,
        payload: data
    };
}

export function error(error) {
    return {
        type: PEER_SERVER_ERROR,
        payload: error
    };
}

export function disconnect() {
    return {
        type: PEER_SERVER_DISCONNECTED,
    };
}
