import {
    CALL_CONNECTED,
    CALL_CONFIRM,
    CALL_REJECT,
    CALL_ERROR,
    CALL_START,
    CALL_STOP
} from "./actionTypes";

import {
    CALL_STATE_DISCONNECTED,
    CALL_STATE_CONNECTING,
    CALL_STATE_CONFIRMING,
    CALL_STATE_CONNECTED
} from "./constants";

export const initialState = {
    data: null,
    error: null,
    progress: CALL_STATE_DISCONNECTED 
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CALL_START:
            return {
                ...state,
                data: null,
                error: null,
                progress: CALL_STATE_CONNECTING
            };
        case CALL_CONFIRM:
            return {
                ...state,
                data: action.payload,
                progress: CALL_STATE_CONFIRMING
            };
        case CALL_CONNECTED:
            return {
                ...state,
                progress: CALL_STATE_CONNECTED
            };
        case CALL_REJECT:
        case CALL_STOP:
            return {
                ...state,
                data: null,
                error: null,
                progress: CALL_STATE_DISCONNECTED
            };
        case CALL_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
