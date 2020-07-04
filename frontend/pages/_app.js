import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BoardProvider } from "contexts/board";

import "assets/css/reset.css";

const board = {
  length: 1000,
  n: 20,
};

export default function App({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardProvider value={board}>
        <Component {...pageProps} />
      </BoardProvider>
    </DndProvider>
  );
}
