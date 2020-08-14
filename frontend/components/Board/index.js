import React from "react";

import { useImageLength, useBoardLength } from "lib/hooks/board";

import Cell from "./Cell";

const containerStyle = (length) => ({
  width: `${length}px`,
  height: `${length}px`,
});

const rowStyle = (nRow) => ({
  display: "flex",
  height: `${100 / nRow}%`,
});

const Board = () => {
  const boardImageLength = useImageLength();
  const boardLength = useBoardLength();

  return (
    <div style={containerStyle(boardLength)}>
      {[...Array(boardImageLength)].map((_, x) => (
        <div key={x} style={rowStyle(boardImageLength)}>
          {[...Array(boardImageLength)].map((_, y) => (
            <Cell x={x} y={y} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
