import React, { useContext } from "react";
import { useDrop } from "react-dnd";

import Square from "components/Square";
import * as Colors from "constants/colors";
import ItemTypes from "constants/itemTypes";
import { pieceCount } from "constants/pieces";
import { BoardContext } from "contexts/board";
import { PlayerContext } from "contexts/player";

import { getAnchorCoordinate, isValidPlacement } from "./logic";

const containerStyle = (length) => ({
  width: `${length}px`,
  height: `${length}px`,
});

const cellStyle = (nCol) => ({
  width: `${100 / nCol}%`,
});

const rowStyle = (nRow) => ({
  display: "flex",
  height: `${100 / nRow}%`,
});

const Board = () => {
  const debug = true;
  const board = useContext(BoardContext);
  const player = useContext(PlayerContext);
  const remainingPieces = Object.keys(player.pieces).length;

  const renderRow = (row, x) =>
    row.map((cell, y) => {
      const [, dropRef] = useDrop({
        accept: ItemTypes.PIECE,
        canDrop: (item, monitor) => {
          const { x: anchorX, y: anchorY } = getAnchorCoordinate(
            x,
            y,
            board.length,
            board.n,
            monitor.getInitialClientOffset(),
            monitor.getInitialSourceClientOffset()
          );

          const res = isValidPlacement(
            anchorX,
            anchorY,
            board.state,
            item.pattern,
            remainingPieces === pieceCount,
            item.colorId
          );
          console.log(res);
          return res;
        },
        drop: (item, monitor) => {
          // console.log(item);
          const { x: anchorX, y: anchorY } = getAnchorCoordinate(
            x,
            y,
            board.length,
            board.n,
            monitor.getInitialClientOffset(),
            monitor.getInitialSourceClientOffset()
          );

          const newState = board.state.map((row) => [...row]);
          item.pattern.forEach((row, px) =>
            row.forEach((cell, py) => {
              if (!!cell) {
                newState[anchorX + px][anchorY + py] = item.colorId;
              }
            })
          );
          board.setState(newState);
          player.removePiece(item.id);
        },
      });

      const cellColor = Colors.state[cell];
      const border = {
        borderRight: board.n === y + 1,
        borderBottom: board.n === x + 1,
      };

      return (
        <div ref={dropRef} key={`${x}-${y}`} style={cellStyle(board.n)}>
          <Square x={x} y={y} color={cellColor} debug={debug} {...border} />
        </div>
      );
    });

  const rows = board.state.map((row, x) => (
    <div key={x} style={rowStyle(board.n)}>
      {renderRow(row, x)}
    </div>
  ));

  return <div style={containerStyle(board.length)}>{rows}</div>;
};

export default Board;
