import React from "react";

import Piece from "components/Piece";
import * as Colors from "constants/colors";

const Board = ({ n = 20 }) => {
  const matrix = [...Array(n).keys()].map(() => Array(n).fill(1));

  return <Piece pattern={matrix} color={Colors.white} />;
};

export default Board;
