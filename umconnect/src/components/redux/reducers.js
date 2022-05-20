import { combineReducers } from "redux";

import * as call from "../call/reducer";
import * as currentUser from "./currentUser";
import * as currentTime from "./currentTime";
import * as peerConnection from "../peer-server/reducer";


export const rootReducer = combineReducers({
  call: call.reducer,
  currentTime: currentTime.reducer,
  currentUser: currentUser.reducer,
  peerConnection: peerConnection.reducer
});

export const initialState = {
  call: call.initialState,
  currentTime: currentTime.initialState,
  currentUser: currentUser.initialState,
  peerConnection: peerConnection.initialState
};

export default rootReducer;
