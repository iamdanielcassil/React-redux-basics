import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import RaceEntries from "../components/entries/RaceEntries";
import "./editRace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSetCurrent",
  "doSaveRace",
  "selectRaces",
  ({ routeParams, currentRace, doSetCurrent, doSaveRace, races }) => {
    console.log("current race is", currentRace);
    const [race, setRace] = useState(currentRace || {});

    useEffect(() => {
      if (races && races.length > 0 && routeParams.id) {
        let race = races.find(r => r.id === routeParams.id);

        if (race) {
          doSetCurrent(race);
        }
      }
    }, [routeParams, doSetCurrent, races]);

    useEffect(() => {
      setRace(currentRace || {});
    }, [currentRace]);

    return (
      <div className="flex-row editRace-form">
        <div className="flex-container">
          <label htmlFor="name">
            Title
            <input
              id="name"
              className="field"
              type="text"
              onChange={e => setRace({ ...race, name: e.target.value })}
              value={race.name || ""}
            />
          </label>
          <label htmlFor="startDate">
            Start Date + Time
            <input
              className="field"
              type="datetime-local"
              onChange={e => setRace({ ...race, startDate: e.target.value })}
              value={race.startDate}
            />
          </label>
          <label htmlFor="windSpeed">
            Wind Speed
            <input
              id="windSpeed"
              className="field"
              type="number"
              onChange={e => setRace({ ...race, windSpeed: e.target.value })}
              value={race.windSpeed || ""}
            />
          </label>
          <label htmlFor="windDirection">
            Wind Direction - should be select list
            <input
              id="windDirection"
              className="field"
              type="text"
              onChange={e =>
                setRace({ ...race, windDirection: e.target.value })
              }
              value={race.windDirection}
            />
          </label>
          <label htmlFor="temperture">
            Temperture
            <input
              className="field"
              type="text"
              onChange={e => setRace({ ...race, temperture: e.target.value })}
              value={race.temperture}
            />
          </label>
          <input
            type="button"
            onClick={() => doSaveRace(new Race(race))}
            value="save"
          />
        </div>
        <div className="flex-container flex-start">
          <RaceEntries />
        </div>
      </div>
    );
  }
);
