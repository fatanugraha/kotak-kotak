import React from "react";

import Piece from "components/Piece";
import pieces from "constants/pieces";
import { usePlayer } from "lib/hooks/player";

const containerStyle = {
  overflowY: "scroll",
  maxHeight: "80vh",
  width: "300px",
};

const pieceStyle = {
  margin: 2,
};

const Sack = () => {
  const { pieceIds, colorId } = usePlayer();

  const availablePieces = pieceIds.map((id) => pieces[id]);

  return (
    <div style={containerStyle}>
      {availablePieces.map((piece, idx) => (
        <div style={pieceStyle}>
          <Piece
            colorId={colorId}
            id={pieceIds[idx]}
            initialPattern={piece}
            key={pieceIds[idx]}
          />
        </div>
      ))}
    </div>
  );
};

export default Sack;
