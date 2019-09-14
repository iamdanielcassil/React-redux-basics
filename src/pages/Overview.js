import React from "react";
import { connect } from "redux-bundler-react";

export default connect(
  "doNewRace",
  "doSaveRace",
  "selectCurrentRace",
  "selectRaces",
  ({ doNewRace, doSaveRace, currentRace, races = [] }) => {
    console.log("in overview", races);
    return (
      <div className="overview">
        {races.map(race => (
          <div key={race.id}>{race.name}</div>
        ))}
        <input
          type="button"
          onClick={() => doNewRace("123")}
          value="new race"
        />
        <div>
          {currentRace ? (
            <div className="form">
              <input
                className="field"
                type="text"
                onChange={e => currentRace.update({ name: e.target.value })}
                value={currentRace.name}
              />
              <input
                className="field"
                type="date"
                onChange={e =>
                  currentRace.update({ startDate: e.target.value })
                }
                value={currentRace.startDate}
              />
              <input
                className="field"
                type="text"
                onChange={e => currentRace.update({ name: e.target.value })}
                value={currentRace.name}
              />
              <input type="button" onClick={() => doSaveRace()} value="save" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);
