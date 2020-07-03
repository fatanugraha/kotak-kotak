import React from "react";
import * as Color from "constants/colors";

const cellStyle = {
  border: `0.25px solid ${Color.black}`,
  borderBottom: "none",
  borderRight: "none",
};

const Board = ({ n = 20 }) => {
  const rows = [...Array(n).keys()].map((rowIdx) => (
    <tr key={rowIdx} style={{ ...cellStyle }}>
      {[...Array(n).keys()].map((colIdx) => (
        <td key={colIdx} style={{ ...cellStyle }}></td>
      ))}
    </tr>
  ));

  return (
    <table className="table" cellSpacing={0}>
      <tbody>{rows}</tbody>
      <style jsx>{`
        .table {
          width: 500px;
          height: 500px;
          border: 0.5px solid ${Color.black};
          background: ${Color.white};
        }
      `}</style>
    </table>
  );
};

export default Board;
