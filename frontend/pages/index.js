import React, { useContext } from "react";

import Board from "components/Board";
import Piece from "components/Piece";

import Patterns from "constants/pieces";

import { BoardContext } from "contexts/board";

const boardContainerStyle = (length) => ({
  width: `${length}px`,
  height: `${length}px`,
});

export default function Home() {
  const board = useContext(BoardContext);
  const unitLength = board.length / board.n;

  return (
    <div style={{ margin: 10 }}>
      <div style={boardContainerStyle(board.length)}>
        <Board />
      </div>
      <br />
      {Patterns.map((pattern) => {
        const width = pattern[0].length * unitLength;
        const height = pattern.length * unitLength;

        return (
          <div style={{ marginBottom: 10 }}>
            <Piece initialPattern={pattern} color="yellow" debug />
          </div>
        );
      })}
    </div>
  );
}
