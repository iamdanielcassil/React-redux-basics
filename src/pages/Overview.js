import React, { useState, useEffect } from "react";
import Race from "../models/Race";
import RaceList from "../components/races/RacesList";
import { connect } from "redux-bundler-react";

export default connect(
  "doSaveRace",
  "selectCurrentRace",
  "selectIsEditing",
  "selectRaces",
  "selectUser",
  ({ doSaveRace, currentRace, isEditing, races, user = [] }) => {
    const [race, setRace] = useState(currentRace || new Race({}));

    useEffect(() => {
      setRace(currentRace || {});
    }, [currentRace]);

    return (
      <div className="overview">
        <RaceList races={races} isLogedIn={user && user.uid} />
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
