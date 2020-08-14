import React from "react";

import Board from "components/Board";
import Sack from "components/Sack";
import { initBoard } from "lib/actions/board";
import { initPlayer } from "lib/actions/player";
import { wrapper } from "lib/store";

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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(initBoard());
    store.dispatch(initPlayer({ colorId: 1 }));
  }
);
