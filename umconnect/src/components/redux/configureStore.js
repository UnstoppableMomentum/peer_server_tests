import { createStore, applyMiddleware } from "redux";

import { rootReducer, initialState } from "./reducers";
import loggingMiddleware from "./loggingMiddleware";
import apiMiddleware from "./apiMiddleware";
import peerServerMiddleware from '../peer-server/middleware'


export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(loggingMiddleware, apiMiddleware, peerServerMiddleware)
  );
  return store;
};

export default configureStore;
