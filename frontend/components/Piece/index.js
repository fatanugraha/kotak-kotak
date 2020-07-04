import React, { useContext, useState } from "react";
import { useDrag } from "react-dnd";

import * as Colors from "constants/colors";
import ItemTypes from "constants/itemTypes";
import { BoardContext } from "contexts/board";
import { flipVertical, rotate90 } from "utils/matrix";

import Pattern from "./pattern";

const containerStyle = (width, height) => ({
  width: `${width}px`,
  height: `${height}px`,
  cursor: "grab",
});

const Piece = ({ initialPattern, colorId, debug }) => {
  const board = useContext(BoardContext);
  const [pattern, setPattern] = useState(initialPattern);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(0);
  const [, dragRef] = useDrag({
    item: {
      type: ItemTypes.PIECE,
      colorId,
      pattern,
    },
  });

  const unitLength = board.length / board.n;
  const width = pattern[0].length * unitLength;
  const height = pattern.length * unitLength;

  const onClick = () => {
    const newPattern = rotate90(pattern);
    const newRotation = (rotation + 1) % 4;
    setPattern(newPattern);
    setRotation(newRotation);
  };

  const onRightClick = (evt) => {
    evt.preventDefault();

    const newPattern = flipVertical(pattern);
    const newFlip = (flip + 1) % 2;
    setPattern(newPattern);
    setFlip(newFlip);
  };

  // if (isDragging) {
  //   return <div ref={dragRef} />;
  // }

  return (
    <div
      ref={dragRef}
      onClick={onClick}
      onContextMenu={onRightClick}
      style={containerStyle(width, height)}
    >
      <Pattern color={Colors.state[colorId]} pattern={pattern} debug={debug} />
    </div>
  );
};

export default Piece;
