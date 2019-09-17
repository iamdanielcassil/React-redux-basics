import React, { useState, useEffect } from "react";
import Race from "../models/Race";
import { connect } from "redux-bundler-react";

export default connect(
  "doNewRace",
  "doSaveRace",
  "doSetCurrent",
  "selectCurrentRace",
  "selectIsEditing",
  "selectRaces",
  ({
    doNewRace,
    doSaveRace,
    doSetCurrent,
    currentRace,
    isEditing,
    races = []
  }) => {
    const [race, setRace] = useState(currentRace || new Race({}));

    useEffect(() => {
      setRace(currentRace || {});
    }, [currentRace]);

    console.log("race func called with state =", race, isEditing);
    return (
      <div className="overview">
        {races.map(race => (
          <div key={race.id}>
            {race.name}
            <input
              type="button"
              onClick={() => doSetCurrent(race)}
              value="view"
            />
            <input
              type="button"
              onClick={() => doSetCurrent(race, true)}
              value="edit"
            />
          </div>
        ))}
        <input
          type="button"
          onClick={() => doNewRace("123")}
          value="new race"
        />
        <div>
          {currentRace && isEditing ? (
            <div className="form">
              <input
                className="field"
                type="text"
                onChange={e => setRace({ ...race, name: e.target.value })}
                value={race.name}
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
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);
