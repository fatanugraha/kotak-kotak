import React from "react";

import * as Colors from "constants/colors";

const containerStyle = ({
  color,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
}) => ({
  height: "100%",
  width: "100%",
  background: color,
  borderLeft: borderLeft ? `1px solid ${Colors.black}` : "none",
  borderRight: borderRight ? `1px solid ${Colors.black}` : "none",
  borderTop: borderTop ? `1px solid ${Colors.black}` : "none",
  borderBottom: borderBottom ? `1px solid ${Colors.black}` : "none",
});

const Square = ({
  color,
  x,
  y,
  borderTop = true,
  borderBottom = true,
  borderLeft = true,
  borderRight = true,
  debug = false,
}) => {
  return (
    <div
      style={containerStyle({
        color,
        borderTop,
        borderLeft,
        borderBottom,
        borderRight,
      })}
    >
      {debug && `${x}, ${y}`}
    </div>
  );
};

export default Square;
