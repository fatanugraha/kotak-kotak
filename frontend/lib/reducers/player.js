import { createReducer } from "@reduxjs/toolkit";
import { pieceCount } from "constants/pieces";
import { initPlayer, usePiece } from "lib/actions/player";

const initialState = {
  pieceIds: [],
  colorId: 0,
};

export default createReducer(initialState, {
  [initPlayer]: (state, action) => {
    state.pieceIds = [...Array(pieceCount).keys()];
    state.colorId = action.payload.colorId;
  },
  [usePiece]: (state, action) => {
    state.pieceIds = state.pieceIds.filter(
      (id) => id !== action.payload.pieceId
    );
  },
});
