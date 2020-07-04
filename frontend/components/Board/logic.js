export const isValidPlacement = (x, y, state, pattern) => {
  const n = state.length;
  const nCol = pattern[0].length;
  const nRow = pattern.length;

  console.log("anchorX", x);
  console.log("anchorY", y);
  if (x < 0 || y < 0 || x + nRow - 1 >= n || y + nCol - 1 >= n) {
    return false;
  }

  return true;
};

export const getAnchorCoordinate = (
  cellX,
  cellY,
  length,
  n,
  initialClientOffset,
  initialSourceClientOffset
) => {
  const pieceX = Math.floor(
    (initialClientOffset.y - initialSourceClientOffset.y) / (length / n)
  );

  const pieceY = Math.floor(
    (initialClientOffset.x - initialSourceClientOffset.x) / (length / n)
  );

  return {
    x: cellX - pieceX,
    y: cellY - pieceY,
  };
};
