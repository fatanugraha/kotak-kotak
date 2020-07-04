import { createContext, useState } from "react";

import initialPieces from "constants/pieces";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children, value = {} }) => {
  const [pieces, setPieces] = useState({ ...initialPieces });

  const additionalValues = {
    pieces,
    removePiece: (id) => {
      const { [id]: _, ...newPieces } = pieces;
      setPieces(newPieces);
    },
  };
  return (
    <PlayerContext.Provider value={{ ...value, ...additionalValues }}>
      {children}
    </PlayerContext.Provider>
  );
};
