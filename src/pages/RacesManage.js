import React from "react";
import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import "./page.css";

export default connect(
  "selectRaces",
  "doGoToManageRace",
  "doNewRace",
  "selectQueryObject",
  ({ races, doGoToManageRace, doNewRace, queryObject }) => {
    return (
      <div className="page">
        <div className="row">
          <div className="double-column">
            <a
              className="button-secondary"
              href="#/races/new"
              onClick={() => doNewRace(queryObject.seasonId)}
            >
              New Race
            </a>
          </div>
        </div>

        <ul className="list">
          {races.map(race => (
            <li key={race.id} className="list-item editable">
              <a href={`#/races/${race.id}`}>
                <span>{race.startDate}</span>
                <span>{race.name}</span>
              </a>

              <a href={`#/races/${race.id}/edit`}>Edit</a>
              <a href={"#/races/manage"} onClick={new Race(race).delete}>
                delete
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);