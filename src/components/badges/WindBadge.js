import React from "react";

export default ({ windSpeed, windDirection }) => {
  return (
    <div>
      Wind: {windDirection ? windDirection.toUpperCase() : ""} at {windSpeed}{" "}
      mph
    </div>
  );
};
