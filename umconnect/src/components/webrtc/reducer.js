import {
    WEBRTC_CONNECTION_STATE_CHANGE,
    WEBRTC_ICE_CONNECTION_STATE_CHANGE,
    WEBRTC_ICE_GATHERING_STATE_CHANGE,
    WEBRTC_SIGNALING_STATE_CHANGE
} from "./actionTypes";

export const initialState = {
    connectionState: null,
    iceConnectionState: null,
    iceGatheringState: null,
    signalingState: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case WEBRTC_CONNECTION_STATE_CHANGE:
            return {
                ...state,
                connectionState: action.payload
            };
        case WEBRTC_ICE_CONNECTION_STATE_CHANGE:
            return {
                ...state,
                iceConnectionState: action.payload
            };
        case WEBRTC_ICE_GATHERING_STATE_CHANGE:
            return {
                ...state,
                iceGatheringState: action.payload
            };
        case WEBRTC_SIGNALING_STATE_CHANGE:
            return {
                ...state,
                signalingState: action.payload
            };
        default:
            return state;
    }
};
