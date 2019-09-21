import React from "react";
import { connect } from "redux-bundler-react";

import "./bar.css";

export default connect(
  "doNewRace",
  "doNewSeason",
  "doSetCurrentSeason",
  "selectSeasons",
  "selectCurrentSeason",
  ({ doNewRace, doNewSeason, doSetCurrentSeason, seasons, currentSeason }) => (
    <div className="bar">
      <div className="threeCol-left flex-row">
        <div className="flex-column left-aligned raceListEntry-cell ">
          <a href="/#/seasons/new" onClick={() => doNewSeason()}>
            new season
          </a>
        </div>

        <div className="flex-column left-aligned raceListEntry-cell ">
          <select
            onChange={e => {
              console.log("select season is ", e.target.value);
              doSetCurrentSeason(seasons.find(s => s.id === e.target.value));
            }}
          >
            {seasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-column raceListEntry-cell center-aligned">
          <a
            href="#/races/new"
            onClick={() => doNewRace(currentSeason ? currentSeason.id : null)}
          >
            new race
          </a>
          {/* <input
            type="button"
            onClick={() => doNewRace("123")}
            value="new race"
          /> */}
        </div>
      </div>
      <div className="threeCol-center flex-row" />
    </div>
  )
);
