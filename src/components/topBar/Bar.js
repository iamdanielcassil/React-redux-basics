import React from "react";
import { connect } from "redux-bundler-react";
import CountBadge from "../badges/CountBade";
import MoreMenu from "../menus/more";

import "./bar.css";

export default connect(
  "doNewSeason",
  "selectSeasons",
  "selectRaces",
  "selectCurrentSeason",
  "selectUser",
  "doUpdateUrl",
  ({ doNewSeason, races, seasons, currentSeason, user, doUpdateUrl }) => (
    <div className="bar flex-row">
      <div className="threeCol-left flex-row flex-start">
        {user && user.uid ? (
          <div className="flex-column right-aligned link red">
            <a href="/#/seasons/new" onClick={() => doNewSeason()}>
              new season
            </a>
          </div>
        ) : null}

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
        {currentSeason && user && user.uid ? (
          <div className="flex-column">
            <MoreMenu>
              <div>
                <a
                  className=""
                  href="/#/seasons/new"
                  onClick={() => doNewSeason()}
                >
                  edit season
                </a>
              </div>
              <span
                className="red"
                onClick={e => {
                  e.preventDefault();
                  console.log("ssdsadsadsadsdsa");
                  if (
                    window.confirm(
                      `Are you shure you want to delete season: ${
                        currentSeason.name
                      }`
                    )
                  ) {
                    doNewSeason();
                  }
                }}
              >
                <span className="font-bold">DELETE SEASON</span>
              </span>
            </MoreMenu>
            {/* <a href="/#/seasons/new" onClick={() => doNewSeason()}>
            edit
          </a> */}
          </div>
        ) : (
          <div className="flex-column">
            <a href="/#/login">sign in</a>
          </div>
        )}
      </div>
    </div>
  )
);
