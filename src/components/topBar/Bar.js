import React from "react";
import "./bar.css";
export default () => (
  <div className="bar">
    <div className="threeCol-left flex-row">
      <div className="flex-column left-aligned raceListEntry-cell ">
        <select>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    </div>
  </div>
);
