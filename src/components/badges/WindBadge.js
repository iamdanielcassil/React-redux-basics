import React from "react";

export default ({ speed, direction }) => {
  return (
    <div>
      Wind: {direction} at {speed}mph
    </div>
  );
};
