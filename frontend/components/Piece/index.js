import React, { useState } from "react";

import { flipVertical, rotate90 } from "utils/matrix";

import Pattern from "./Pattern";

const Piece = ({ id, initialPattern, colorId, debug }) => {
  const [pattern, setPattern] = useState(initialPattern);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState(0);

  const onClick = () => {
    const newPattern = rotate90(pattern);
    const newRotation = (rotation + 1) % 4;
    setPattern(newPattern);
    setRotation(newRotation);
  };

  const onRightClick = (evt) => {
    evt.preventDefault();

    const newPattern = flipVertical(pattern);
    const newFlip = (flip + 1) % 2;
    setPattern(newPattern);
    setFlip(newFlip);
  };

  return (
    <Pattern
      colorId={colorId}
      debug={debug}
      id={id}
      onClick={onClick}
      onRightClick={onRightClick}
      pattern={pattern}
    />
  );
};

export default Piece;
