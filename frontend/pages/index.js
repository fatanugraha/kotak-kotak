import Board from "components/Board";
import Pattern from "components/Pattern";

import Patterns from "constants/pieces";

const N_BOARD = 20;

const BOARD_LENGTH = 1000;

const UNIT_SQUARE_LENGTH = BOARD_LENGTH / N_BOARD;

const boardContainerStyle = {
  width: `${BOARD_LENGTH}px`,
  height: `${BOARD_LENGTH}px`,
};

export default function Home() {
  return (
    <div style={{ margin: 10 }}>
      <div style={boardContainerStyle}>
        <Board />
      </div>
      {Patterns.map((pattern) => {
        const width = pattern[0].length * UNIT_SQUARE_LENGTH;
        const height = pattern.length * UNIT_SQUARE_LENGTH;

        return (
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
                marginTop: 10,
              }}
            >
              <Pattern color="yellow" pattern={pattern} debug />
            </div>
          </div>
        );
      })}
    </div>
  );
}
