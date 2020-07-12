import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import board from "./reducers/board";
import player from "./reducers/player";

const appReducers = combineReducers({ board, player });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default:
      return appReducers(state, action);
  }
};

export default rootReducer;
