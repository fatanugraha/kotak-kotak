import { createAction } from "@reduxjs/toolkit";

import { getAnchorPosition, validatePlacement } from "utils/board";

import { setPiece } from "./board";

export const initPlayer = createAction("player/INIT_PLAYER");

export const usePiece = createAction("player/USE_PIECE");

export const playPiece = (pieceId, pattern, x, y, offset, sourceOffset) => (
  dispatch,
  getState
) => {
  const { board, player } = getState();
  const { colorId } = player;

  const anchor = getAnchorPosition(
    x,
    y,
    offset,
    sourceOffset,
    board.length,
    board.image.length
  );

  dispatch(setPiece({ x: anchor.x, y: anchor.y, pattern, colorId }));
  dispatch(usePiece({ pieceId }));
};

export const validateMove = (x, y, pattern, offset, sourceOffset) => (
  _,
  getState
) => {
  const { board, player } = getState();
  const { pieceIds, colorId } = player;

  const anchor = getAnchorPosition(
    x,
    y,
    offset,
    sourceOffset,
    board.length,
    board.image.length
  );

  return validatePlacement(
    anchor.x,
    anchor.y,
    board.image,
    pattern,
    pieceIds.length,
    colorId
  );
};
