import React from "react";
import { connect } from "redux-bundler-react";
import "./boats.css";

export default connect(
  "selectRaces",
  "doGoToManageRace",
  ({ races, doGoToManageRace }) => {
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
          <li className="list-item">
            <span>Date</span>
            <span>Name</span>
          </li>
        </ul>
        <ul className="list">
          {races.map(race => (
            <li key={race.id} className="list-item editable">
              <a href={`#/races/manage/${race.id}`}>
                <span>{race.startDate}</span>
                <span>{race.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
