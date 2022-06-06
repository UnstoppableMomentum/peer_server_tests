
import { DialogCallRejected } from '../dialogs/DialogCallRejected'

import {
    CALL_CONNECTED,
    CALL_CONFIRM,
    CALL_REJECT,
    CALL_STOP,
    CALL_START,
    CALL_ERROR,
    CALL_CONNECTION_EVENT
} from "./actionTypes";

import { callStart as webrtcCallStart, callStop as webrtcCallStop, handleOffer as webrtcHandleOffer } from '../webrtc'
import { sendMessageReject } from '../peer-server'

export function askConfirmCall(dispatch, from, offer) {
    dispatch(_confirmCall(from, offer));
}

export function confirmCall(dispatch, idRemote, offer) {
    dispatch(_callStart(idRemote));
    webrtcHandleOffer(dispatch, idRemote, offer)
}

export function call(dispatch, remoteName) {
  dispatch(_callStart(remoteName));
  webrtcCallStart(dispatch, remoteName);
}

export function incomingCall(dispatch, callData) {
    dispatch(_callStart());
    const { from, offer } = callData;
    webrtcHandleOffer(dispatch, from, offer);
}
  
export function callConnected(dispatch) {
    dispatch(_callConnected());
}

export function reject(dispatch, remoteName) {
    sendMessageReject(remoteName);
    dispatch(_callStop(remoteName));
    return dispatch(_callReject());
}

export function incomingReject(dispatch, remoteName) {
    webrtcCallStop();
    dispatch(_callStop(remoteName));
    DialogCallRejected(remoteName);
}

export function hangup(dispatch) {
    webrtcCallStop();
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

export function _confirmCall(from, offer) {
    return {
        type: CALL_CONFIRM,
        payload: {
            from,
            offer
        }
    };
}

function _callReject() {
    return {
        type: CALL_REJECT,
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
