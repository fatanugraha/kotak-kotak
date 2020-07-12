import React from "react";
import { useDrag } from "react-dnd";

import Square from "components/Square";
import * as Colors from "constants/colors";
import ItemTypes from "constants/itemTypes";
import { unitLength } from "constants/pieces";
import { useBoardLength, useImageLength } from "lib/hooks/board";

const containerStyle = (width, height) => ({
  height,
  width,
  cursor: "grab",
});

const cellStyle = (nCol) => ({
  width: `${100 / nCol}%`,
});

const rowStyle = (nRow) => ({
  display: "flex",
  height: `${100 / nRow}%`,
});

const Piece = ({
  colorId,
  debug = false,
  id,
  onClick,
  onRightClick,
  pattern,
}) => {
  const imageLength = useImageLength();
  const boardLength = useBoardLength();
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: ItemTypes.PIECE,
      id,
      pattern,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) {
    return <div ref={dragRef}></div>;
  }

  const color = Colors.state[colorId];

  const unitLength = boardLength / imageLength;
  const width = pattern[0].length * unitLength;
  const height = pattern.length * unitLength;

  const nRow = pattern.length;
  const nCol = pattern[0].length;

  const renderRow = (row, x) =>
    row.map((cell, y) => {
      const cellColor = cell ? color : "none";
      const border = {
        borderTop: !!cell || (x > 0 && !!pattern[x - 1][y]),
        borderLeft: !!cell || (y > 0 && !!pattern[x][y - 1]),
        borderBottom: !!cell && nRow === x + 1,
        borderRight: !!cell && nCol === y + 1,
      };

      return (
        <div key={`${x}-${y}`} style={cellStyle(nCol)}>
          <Square x={x} y={y} color={cellColor} debug={debug} {...border} />
        </div>
      );
    });

  const rows = pattern.map((row, x) => (
    <div key={x} style={rowStyle(nRow)}>
      {renderRow(row, x)}
    </div>
  ));

  return (
    <div
      ref={dragRef}
      style={containerStyle(width, height)}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {rows}
    </div>
  );
};

export default Piece;
