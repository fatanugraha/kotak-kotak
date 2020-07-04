import React from "react";

import Square from "components/Square";

const containerStyle = {
  height: "100%",
  width: "100%",
};

const rowStyle = (nRow) => ({
  display: "flex",
  height: `${100 / nRow}%`,
});

const squareStyle = (nCol) => ({
  width: `${100 / nCol}%`,
});

const Piece = ({ pattern, color }) => {
  const nRow = pattern.length;
  const nCol = pattern[0].length;

  const renderRow = (row, x) =>
    row.map((cell, y) => {
      const cellColor = cell ? color : "none";
      const border = {
        borderTop: !!cell,
        borderLeft: !!cell,
        borderBottom:
          !!cell &&
          (nRow === x + 1 || (x + 1 < nRow && pattern[x + 1][y] === 0)),
        borderRight:
          !!cell &&
          (nCol === y + 1 || (y + 1 < nCol && pattern[x][y + 1] === 0)),
      };

      return (
        <div style={squareStyle(nCol)}>
          <Square x={x} y={y} color={cellColor} {...border} />
        </div>
      );
    });

  const rows = pattern.map((row, colIdx) => (
    <div key={colIdx} style={rowStyle(nRow)}>
      {renderRow(row, colIdx)}
    </div>
  ));

  return <div style={containerStyle}>{rows}</div>;
};

export default Piece;
