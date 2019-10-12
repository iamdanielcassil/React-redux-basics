import React from "react";
import { connect } from "redux-bundler-react";
import More from "../components/menus/more";
import "./boats.css";

export default connect(
  "selectBoats",
  "doGoToSelectBoat",
  ({ boats, doGoToSelectBoat }) => {
    return (
      <div className="boats">
        <div className="row">
          <div className="double-column">
            <a className="button-secondary" href="#/boats/new">
              New Boat
            </a>
          </div>
        </div>
        <ul className="list">
          {boats.map(boat => (
            <li
              key={boat.id}
              className="list-item editable"
              onClick={() => doGoToSelectBoat(boat.id)}
            >
              <span className="list-column">
                <span>{boat.name}</span>
                <span className="secondary">Captain: {boat.captain}</span>
              </span>
              <span className="list-column">
                <span>{boat.maker}</span>
                <span className="secondary">{boat.type}</span>
              </span>
              <span className="list-column">
                <More>
                  <span>a</span>
                  <span>a</span>
                </More>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
