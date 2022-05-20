import {
    CALL_CONNECTED,
    CALL_STOP,
    CALL_START,
    CALL_ERROR,
    CALL_CONNECTION_EVENT
} from "./actionTypes";

export const initialState = {
    data: null,
    error: null,
    progress: 0 
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CALL_START:
            return {
                ...state,
                data: null,
                error: null,
                progress: 1
            };
        case CALL_CONNECTED:
            return {
                ...state,
                progress: 2
            };
        case CALL_STOP:
            return {
                ...state,
                data: null,
                error: null,
                callState: 0
            };
        case CALL_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CALL_CONNECTION_EVENT:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};
