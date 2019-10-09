import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import RaceEntries from "../components/entries/RaceEntries";
import "./editRace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSaveRace",
  "selectRaces",
  "doSelectCurrentSeason",
  ({ routeParams, currentRace, doSaveRace, races, doSelectCurrentSeason }) => {
    const [currentSeason] = useState(doSelectCurrentSeason());
    const [race, setRace] = useState(() => {
      if (!currentSeason) {
        throw new Error("must have valid season before creating new race");
      }

      return currentRace
        ? new Race(currentRace)
        : new Race({ seasonId: currentSeason.id });
    });

    console.log("current race is", race);

    useEffect(() => {
      if (!race.id && races && routeParams.id) {
        let _race = races.find(r => r.id === routeParams.id);

        if (_race) {
          setRace(_race);
        }
      }
    }, [race, races, routeParams, setRace]);

    useEffect(() => {
      let _race = {
        seasonId: currentSeason && currentSeason.id,
        startDate: new Date().toDateString(),
        ...currentRace
      };

      setRace(_race);
    }, [currentRace, currentSeason]);

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
              value={getDateTime(race.startDate)}
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
            <select
              id="windDirection"
              className="field"
              type="text"
              onChange={e =>
                setRace({ ...race, windDirection: e.target.value })
              }
              value={race.windDirection || ""}
            >
              <option value="">Please Select</option>
              <option value="n">N</option>
              <option value="ne">NE</option>
              <option value="e">E</option>
              <option value="se">SE</option>
              <option value="s">S</option>
              <option value="sw">SW</option>
              <option value="w">W</option>
              <option value="nw">NW</option>
            </select>
            {/* <input
              id="windDirection"
              className="field"
              type="text"
              onChange={e =>
                setRace({ ...race, windDirection: e.target.value })
              }
              value={race.windDirection || ""}
            /> */}
          </label>
          <label htmlFor="temperature">
            Temperature (f)
            <input
              placeholder="f"
              className="field"
              min={0}
              max={110}
              type="number"
              onChange={e => setRace({ ...race, temperature: e.target.value })}
              value={race.temperature || ""}
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

function getDateTime(d) {
  let date;

  if (d) {
    date = new Date(d);
  } else {
    date = new Date();
  }

  let dateString = date.toISOString();
  let returnString = dateString.substring(0, 19);
  return returnString;
}
