import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import Square from "components/Square";
import * as Colors from "constants/colors";
import ItemTypes from "constants/itemTypes";
import { playPiece, validateMove } from "lib/actions/player";
import { useImageLength, useCellState } from "lib/hooks/board";

const cellStyle = (nCol) => ({
  width: `${100 / nCol}%`,
});

const Cell = ({ x, y }) => {
  const debug = true;
  const dispatch = useDispatch();
  const state = useCellState(x, y);
  const boardLength = useImageLength();

  const [, dropRef] = useDrop({
    accept: ItemTypes.PIECE,
    canDrop: (item, monitor) => {
      const { pattern } = item;

      const offset = monitor.getInitialClientOffset();
      const sourceOffset = monitor.getInitialSourceClientOffset();

      const isValid = dispatch(
        validateMove(x, y, pattern, offset, sourceOffset)
      );
      return isValid;
    },
    drop: (item, monitor) => {
      const { id, pattern } = item;
      console.log(item);

      const offset = monitor.getInitialClientOffset();
      const sourceOffset = monitor.getInitialSourceClientOffset();

      dispatch(playPiece(id, pattern, x, y, offset, sourceOffset));
    },
  });

  const cellColor = Colors.state[state];
  const border = {
    borderRight: boardLength === y + 1,
    borderBottom: boardLength === x + 1,
  };

  return (
    <div ref={dropRef} style={cellStyle(boardLength)}>
      <Square x={x} y={y} color={cellColor} debug={debug} {...border} />
    </div>
  );
};

export default Cell;
