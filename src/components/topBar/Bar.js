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
    <div className="bar flex-row">
      <div className="threeCol-left flex-row flex-start">
        <div className="flex-column right-aligned link red">
          <a href="/#/seasons/new" onClick={() => doNewSeason()}>
            new season
          </a>
        </div>

        <div className="flex-column left-aligned">
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
      </div>
      <div className="threeCol-center flex-row" />
      <div className="threeCol-right flex-row flex-end">
        <div className="flex-column link">
          <a href="/#/seasons/new" onClick={() => doNewSeason()}>
            edit
          </a>
        </div>
      </div>
    </div>
  )
);
