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
            <span />
            <span>Points</span>
            <span>Rank</span>
          </li>
        </ul>
        <ul className="list">
          {boats.map(boat => (
            <li
              key={boat.id}
              className="list-item"
              onClick={() => doGoToSelectBoat(boat.id)}
            >
              <span>{boat.name}</span>
              <span>{boat.captain}</span>
              <span />
              <span>Points</span>
              <span>Rank</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
