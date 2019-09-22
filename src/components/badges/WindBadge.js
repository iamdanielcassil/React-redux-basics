import React from "react";

export default ({ windSpeed, windDirection }) => {
  return (
    <div>
      Wind: {windDirection} at {windSpeed}mph
    </div>
  );
};
