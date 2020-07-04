import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BoardProvider } from "contexts/board";
import { PlayerProvider } from "contexts/player";

import "assets/css/reset.css";

const board = {
  length: 800,
  n: 20,
};

export default function App({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardProvider value={board}>
        <PlayerProvider>
          <Component {...pageProps} />
        </PlayerProvider>
      </BoardProvider>
    </DndProvider>
  );
}
