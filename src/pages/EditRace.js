import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import "./viewrace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSetCurrent",
  "doSaveRace",
  "selectRaces",
  ({ routeParams, currentRace, doSetCurrent, doSaveRace, races }) => {
    const [race, setRace] = useState(currentRace || new Race({}));

    useEffect(() => {
      if (races && races.length > 0 && routeParams.id) {
        let race = races.find(r => r.id === routeParams.id);
        console.log("in use effect, races and race are", races, race);

        if (race) {
          doSetCurrent(race);
        }
      }
    }, [routeParams, doSetCurrent, races]);

    useEffect(() => {
      setRace(currentRace || {});
    }, [currentRace]);

    console.log("current race is:", currentRace);
    return (
      <div>
        {currentRace ? (
          <div className="form">
            <input
              className="field"
              type="text"
              onChange={e => setRace({ ...race, name: e.target.value })}
              value={race.name || ""}
            />
            <input
              className="field"
              type="date"
              onChange={e => setRace({ ...race, startDate: e.target.value })}
              value={race.startDate}
            />
            <input
              type="button"
              onClick={() => doSaveRace(race.update(race))}
              value="save"
            />
          </div>
        ) : null}
      </div>
    );
  }
);
