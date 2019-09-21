import React from "react";
import { connect } from "redux-bundler-react";
import CountBadge from "../badges/CountBade";

import "./bar.css";

export default connect(
  "doNewSeason",
  "selectSeasons",
  "selectRaces",
  "selectCurrentSeason",
  "doUpdateUrl",
  ({ doNewSeason, races, seasons, currentSeason, doUpdateUrl }) => (
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
              doUpdateUrl({ query: { seasonId: e.target.value } });
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
      <div className="threeCol-center flex-row">
        {currentSeason ? (
          <React.Fragment>
            <div className="flex-column bar-info">{`${
              currentSeason.startDate
            } - ${currentSeason.endDate}`}</div>
            <div className="flex-column bar-info font-bold">
              {currentSeason.name}
            </div>
            <div className="flex-column bar-info">
              <CountBadge count={races.length} label="Races" />
            </div>
          </React.Fragment>
        ) : null}
      </div>
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
