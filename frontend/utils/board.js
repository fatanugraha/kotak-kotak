import { pieceCount } from "constants/pieces";

export const getAnchorPosition = (
  x,
  y,
  offset,
  sourceOffset,
  boardLength,
  imageLength
) => {
  const anchorX =
    x - Math.floor((offset.y - sourceOffset.y) / (boardLength / imageLength));
  const anchorY =
    y - Math.floor((offset.x - sourceOffset.x) / (boardLength / imageLength));

  return { x: anchorX, y: anchorY };
};

export const validatePlacement = (
  x,
  y,
  state,
  pattern,
  remainingCount,
  colorId
) => {
  const n = state.length;
  const nCol = pattern[0].length;
  const nRow = pattern.length;

  if (x < 0 || y < 0 || x + nRow - 1 >= n || y + nCol - 1 >= n) {
    return false;
  }

  if (remainingCount === pieceCount) {
    const xx = x + nRow - 1;
    const yy = y + nCol - 1;

    return (
      (x === 0 && y === 0 && !!pattern[0][0]) ||
      (xx === n - 1 && y === 0 && !!pattern[nRow - 1][0]) ||
      (x === 0 && yy === n - 1 && !!pattern[0][nCol - 1]) ||
      (xx === n - 1 && yy === n - 1 && !!pattern[nRow - 1][nCol - 1])
    );
  }

  let valid = false;
  for (let i = 0; i < nRow; i++) {
    for (let j = 0; j < nCol; j++) {
      const xOffset = x + i;
      const yOffset = y + j;

      if (!!pattern[i][j]) {
        if (
          !!state[xOffset][yOffset] ||
          (xOffset - 1 >= 0 && !!state[xOffset - 1][yOffset]) ||
          (xOffset + 1 < n && !!state[xOffset + 1][yOffset]) ||
          (yOffset - 1 >= 0 && !!state[xOffset][yOffset - 1]) ||
          (yOffset + 1 < n && !!state[xOffset][yOffset + 1])
        ) {
          return false;
        }

        if (
          (xOffset - 1 >= 0 &&
            yOffset - 1 >= 0 &&
            state[xOffset - 1][yOffset - 1] === colorId) ||
          (xOffset - 1 >= 0 &&
            yOffset + 1 < n &&
            state[xOffset - 1][yOffset + 1] === colorId) ||
          (xOffset + 1 < n &&
            yOffset - 1 >= 0 &&
            state[xOffset + 1][yOffset - 1] === colorId) ||
          (xOffset + 1 < n &&
            yOffset + 1 < n &&
            state[xOffset + 1][yOffset + 1] === colorId)
        ) {
          valid = true;
        }
      }
    }
  }

  return valid;
};
