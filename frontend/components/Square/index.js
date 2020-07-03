import React from "react";

import * as Color from "constants/colors";

const Square = ({ height = "100px", width = "100px", color, children }) => {
  return (
    <div className="square">
      {children}
      <style jsx>
        {`
          .square {
            box-sizing: border-box;
            display: inline-flex;
            background: ${color};
            width: ${width};
            height: ${height};
            border: 1px solid ${Color.black};
          }
        `}
      </style>
    </div>
  );
};

export default Square;
