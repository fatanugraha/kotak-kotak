import React from "react";

import Square from "components/Square";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const cellStyle = (nCol) => ({
  width: `${100 / nCol}%`,
});

const rowStyle = (nRow) => ({
  display: "flex",
  height: `${100 / nRow}%`,
});

const Piece = ({ pattern, color, debug = false }) => {
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

  return <div style={containerStyle}>{rows}</div>;
};

export default Piece;
