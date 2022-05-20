import {
    PEER_SERVER_CONNECTED,
    PEER_SERVER_DISCONNECTED,
    PEER_SERVER_REGISTERED,
    PEER_SERVER_START_CONNECTION,
    PEER_SERVER_ERROR
} from "./actionTypes";

export const initialState = {
    data: null,
    webSocket: null,
    connected: false,
    registered: false,
    error: null,
    progress: 0
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PEER_SERVER_CONNECTED:
            return {
                ...state,
                webSocket: action.payload,
                connected: true,
                registered: false,
                error: null,
                progress: 2
            };
        case PEER_SERVER_DISCONNECTED:
            return {
                ...state,
                webSocket: null,
                connected: false,
                registered: false,
                error: null,
                progress: 0
            };
            case PEER_SERVER_REGISTERED:
                return {
                    ...state,
                    data: action.payload,
                    registered: true,
                    progress: 3
                };    
            case PEER_SERVER_START_CONNECTION:
            return {
                ...state,
                webSocket: null,
                connected: false,
                error: null,
                progress: 1
            };
        case PEER_SERVER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
