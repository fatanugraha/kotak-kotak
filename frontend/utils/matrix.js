export const rotate90 = (matrix) => {
  if (matrix.length < 1) {
    return matrix;
  }

  return matrix[0].map((_, colIdx) => {
    return matrix.map(
      (_, rowIdx) => matrix[matrix.length - rowIdx - 1][colIdx]
    );
  });
};

export const flipVertical = (matrix) => {
  return matrix.reduce((acc, arr) => [arr, ...acc], []);
};
