import React, { useContext, useState } from "react";

import Pattern from "components/Pattern";

import { BoardContext } from "contexts/board";

import { rotate90 } from "utils/matrix";

const containerStyle = (width, height) => ({
  width: `${width}px`,
  height: `${height}px`,
});

const Piece = ({ initialPattern, color, debug }) => {
  const board = useContext(BoardContext);
  const [pattern, setPattern] = useState(initialPattern);
  const [rotation, setRotation] = useState(0);

  const unitLength = board.length / board.n;
  const width = pattern[0].length * unitLength;
  const height = pattern.length * unitLength;

  const onClick = () => {
    const newPattern = rotate90(pattern);
    const newRotation = (rotation + 1) % 4;
    setPattern(newPattern);
    setRotation(newRotation);
  };

  return (
    <div onClick={onClick} style={containerStyle(width, height)}>
      <Pattern color={color} pattern={pattern} debug={debug} />
    </div>
  );
};

export default Piece;
