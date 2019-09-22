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
        <div className="flex-column left-aligned">
          <select
            className="bar-seasons-select"
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
        {currentSeason && user && user.uid ? (
          <div className="flex-column">
            <MoreMenu>
              <a
                className=""
                href="/#/seasons/new"
                onClick={() => doNewSeason()}
              >
                edit season
              </a>
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
              <a href="/#/seasons/new" onClick={() => doNewSeason()}>
                new season
              </a>
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
      <div className="threeCol-center flex-row" />
      <div className="threeCol-right flex-row flex-end">
        {window.location.hash.trim() !== "" && window.location.hash !== "#/" ? (
          <div className="flex-column bar-info">
            <a href="#/">back to list</a>
          </div>
        ) : null}
        {currentSeason ? (
          <React.Fragment>
            <div className="flex-column bar-info">
              <CountBadge count={races.length} label="Races" />
            </div>
            <div className="flex-column bar-info font-10pt">{`${
              currentSeason.startDate
            } - ${currentSeason.endDate}`}</div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  )
);
