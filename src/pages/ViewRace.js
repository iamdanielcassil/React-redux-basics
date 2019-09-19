import React, { useEffect } from "react";
import { connect } from "redux-bundler-react";
import "./viewrace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSetCurrent",
  "selectRaces",
  ({ routeParams, currentRace, doSetCurrent, races }) => {
    useEffect(() => {
      if (races && races.length > 0 && routeParams.id) {
        let race = races.find(r => r.id === routeParams.id);

        if (race) {
          doSetCurrent(race);
        }
      }
    }, [routeParams, doSetCurrent, races]);
    return (
      <div>
        {currentRace ? (
          <div className="form">
            <span>name: {currentRace.name}</span>
            <span>start: {currentRace.startDate}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
);
