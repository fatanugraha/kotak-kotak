import { useSelector } from "react-redux";

export const useCellState = (x, y) => {
  return useSelector((state) => state.board.image && state.board.image[x][y]);
};

export const useImageLength = () => {
  return useSelector((state) => state.board.image && state.board.image.length);
};

export const useBoardLength = () => {
  return useSelector((state) => state.board.length);
};
