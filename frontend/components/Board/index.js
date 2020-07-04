import React from "react";

import Pattern from "components/Pattern";
import * as Colors from "constants/colors";

const Board = ({ n = 20 }) => {
  const matrix = [...Array(n).keys()].map(() => Array(n).fill(1));

  return <Pattern pattern={matrix} color={Colors.white} />;
};

export default Board;
