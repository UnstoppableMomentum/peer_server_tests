import { combineReducers } from "redux";

import * as call from "../call/reducer";
import * as currentUser from "./currentUser";
import * as currentTime from "./currentTime";
import * as dialogContainer from "../dialogs/reducer";
import * as peerConnection from "../peer-server/reducer";
import * as webrtc from "../webrtc/reducer";
import * as sidebar from "../menu/reducer";

export const rootReducer = combineReducers({
  call: call.reducer,
  currentTime: currentTime.reducer,
  currentUser: currentUser.reducer,
  dialogContainer : dialogContainer.reducer,
  peerConnection: peerConnection.reducer,
  webrtc: webrtc.reducer
});

export const initialState = {
  call: call.initialState,
  currentTime: currentTime.initialState,
  currentUser: currentUser.initialState,
  dialogContainer: dialogContainer.initialState,
  peerConnection: peerConnection.initialState,
  webrtc: webrtc.initialState
};

export default rootReducer;
