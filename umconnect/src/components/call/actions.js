import {
    CALL_CONNECTED,
    CALL_STOP,
    CALL_START,
    CALL_ERROR,
    CALL_CONNECTION_EVENT
} from "./actionTypes";

import { callStart } from '../webrtc/webrtc'

export function call(dispatch, remoteName) {
  dispatch(_callStart(remoteName));
  callStart(dispatch, remoteName);
}

export function callConnected(dispatch) {
    dispatch(_callConnected());
}  

export function hangup(dispatch) {
    return dispatch(_callStop());
}  

export function callConnectionEvent(dispatch, data) {
    return dispatch(_callConnectionEvent(data));
}

export function error(dispatch, error) {
    return dispatch(_error(error));
}

export function _callStart(remoteName) {
    return {
        type: CALL_START,
        payload: remoteName
    };
}

function _callStop() {
    return {
        type: CALL_STOP,
    };
}

export function _callConnected() {
    return {
        type: CALL_CONNECTED,
    };
}

function _callConnectionEvent(data) {
    return {
        type: CALL_CONNECTION_EVENT,
        payload: data
    };
}

function _error(error) {
    return {
        type: CALL_ERROR,
        payload: error
    };
}
