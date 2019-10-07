import React from "react";
import { connect } from "redux-bundler-react";
import "./boats.css";

export default connect(
  "selectBoats",
  "doGoToSelectBoat",
  ({ boats, doGoToSelectBoat }) => {
    return (
      <div className="boats">
        <span />
        <ul className="list">
          <li className="list-item">
            <span>Boat</span>
            <span>Captain</span>
            <span>Maker</span>
            <span>Type</span>
            <span>PHRF</span>
          </li>
        </ul>
        <ul className="list">
          {boats.map(boat => (
            <li
              key={boat.id}
              className="list-item editable"
              onClick={() => doGoToSelectBoat(boat.id)}
            >
              <span>{boat.name}</span>
              <span>{boat.captain}</span>
              <span>{boat.maker}</span>
              <span>{boat.type}</span>
              <span>{boat.phrf}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
