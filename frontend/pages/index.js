import React from "react";

import Board from "components/Board";
import Sack from "components/Sack";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Board />
        <Sack />
      </div>
    </div>
  );
}
