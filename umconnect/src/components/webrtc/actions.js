import {
    WEBRTC_CONNECTION_STATE_CHANGE,
    WEBRTC_ICE_CONNECTION_STATE_CHANGE,
    WEBRTC_ICE_GATHERING_STATE_CHANGE,
    WEBRTC_SIGNALING_STATE_CHANGE
} from "./actionTypes";

//TODO: Improve this
import { callStop as callStopCall } from '../call';

//TODO: Investigate for a better solution
export function iceConnectionStateChange(dispatch, data) {
    dispatch(_iceConnectionStateChange(data));
}

//TODO: Investigate for a better solution
function _iceConnectionStateChange(data) {
    return {
        type: WEBRTC_ICE_CONNECTION_STATE_CHANGE,
        payload: data
    }
}

export function connectionStateChange(dispatch, data) {
    dispatch(_connectionStateChange(data));
    switch (data) {
        case 'disconnected':
        case 'fail':
            callStopCall(dispatch);
            break;
    }
}

function _connectionStateChange(data) {
    return {
        type: WEBRTC_CONNECTION_STATE_CHANGE,
        payload: data
    }
}

export function iceGatheringStateChange(dispatch, data) {
    dispatch(_iceGatheringStateChange(data));
}

function _iceGatheringStateChange(data) {
    return {
        type: WEBRTC_ICE_GATHERING_STATE_CHANGE,
        payload: data
    }
}

export function signalingStateChange(dispatch, data) {
    dispatch(_signalingStateChange(data));
}

function _signalingStateChange(data) {
    return {
        type: WEBRTC_SIGNALING_STATE_CHANGE,
        payload: data
    }
}