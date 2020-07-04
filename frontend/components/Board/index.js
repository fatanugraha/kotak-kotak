import React, { useContext } from "react";

import Pattern from "components/Pattern";
import * as Colors from "constants/colors";
import { BoardContext } from "contexts/board";

const containerStyle = (length) => ({
  width: `${length}px`,
  height: `${length}px`,
});

const Board = ({ n = 20 }) => {
  const board = useContext(BoardContext);

  const matrix = [...Array(n).keys()].map(() => Array(n).fill(1));

  return (
    <div style={containerStyle(board.length)}>
      <Pattern pattern={matrix} color={Colors.white} />
    </div>
  );
};

export default Board;
