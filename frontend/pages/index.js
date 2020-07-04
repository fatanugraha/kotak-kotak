import React from "react";

import Board from "components/Board";
import Piece from "components/Piece";

import Patterns from "constants/pieces";

export default function Home() {
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
        {Patterns.map((pattern, idx) => {
          return (
            <div key={idx} style={{ marginBottom: 10 }}>
              <Piece initialPattern={pattern} colorId={1} debug />
            </div>
          );
        })}
      </div>
    </div>
  );
}
