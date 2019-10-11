import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import RaceEntries from "../components/entries/RaceEntries";
import "./editRace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSaveRace",
  "doSetCurrent",
  "selectRaces",
  "doSelectCurrentSeason",
  "doGoToManageRaces",
  ({
    routeParams,
    currentRace,
    doSaveRace,
    doSetCurrent,
    races,
    doSelectCurrentSeason,
    doGoToManageRaces
  }) => {
    const [currentSeason] = useState(doSelectCurrentSeason());
    const [race, setRace] = useState();

    useEffect(() => {
      doSetCurrent(routeParams.id);
    }, [routeParams.id, doSetCurrent, races]);

    useEffect(() => {
      setRace(currentRace);
    }, [currentRace]);

    if (!race) {
      return null;
    }

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
            onClick={() =>
              doSaveRace(currentRace.update(race)).then(() =>
                doGoToManageRaces()
              )
            }
            value="save"
          />
        </div>
        <div className="flex-container flex-start">
          <RaceEntries race={currentRace} test="test" />
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
