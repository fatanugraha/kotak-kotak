import { createContext, useState } from "react";

export const BoardContext = createContext(null);

export const BoardProvider = ({ children, value }) => {
  // TODO: only init on new game
  const [state, setState] = useState(
    Array(value.n).fill(Array(value.n).fill(0))
  );
  const additionalValue = { state, setState };

  return (
    <BoardContext.Provider value={{ ...value, ...additionalValue }}>
      {children}
    </BoardContext.Provider>
  );
};
