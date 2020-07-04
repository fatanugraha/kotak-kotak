import React, { useContext } from "react";

import Board from "components/Board";
import Piece from "components/Piece";
import { PlayerContext } from "contexts/player";

export default function Home() {
  const { pieces } = useContext(PlayerContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: 10,
        width: "90%",
        maxHeight: "90vh",
      }}
    >
      <Board />
      <div style={{ overflowY: "scroll", maxHeight: "80%", width: "250px" }}>
        {Object.keys(pieces).map((key) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <Piece
              initialPattern={pieces[key]}
              id={key}
              colorId={1}
              debug
            ></Piece>
          </div>
        ))}
      </div>
    </div>
  );
}
