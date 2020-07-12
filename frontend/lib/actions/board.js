import { createAction } from "@reduxjs/toolkit";

export const initBoard = createAction("board/INIT_BOARD");

export const setPiece = createAction("board/SET_PIECE");
