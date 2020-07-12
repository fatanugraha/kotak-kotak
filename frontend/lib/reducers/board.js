import { createReducer } from "@reduxjs/toolkit";

import { initBoard, setPiece } from "lib/actions/board";

const N = 20;

const initialState = {
  image: null,
  length: 800,
};

export default createReducer(initialState, {
  [initBoard]: (state) => {
    state.image = [...Array(N).fill(Array(N).fill(0))];
  },
  [setPiece]: (state, action) => {
    const { x, y, pattern, colorId } = action.payload;

    pattern.forEach((row, px) =>
      row.forEach((cell, py) => {
        if (!!cell) {
          state.image[x + px][y + py] = colorId;
        }
      })
    );
  },
});
