import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./rootReducer";

const IS_DEV = process.env.NODE_ENV !== "production";

const bindMiddleware = (...middleware) => {
  if (IS_DEV) {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

export const makeStore = (_) => {
  const store = createStore(rootReducer, bindMiddleware(thunkMiddleware));

  return store;
};

export const wrapper = createWrapper(makeStore, {
  debug: IS_DEV,
});
