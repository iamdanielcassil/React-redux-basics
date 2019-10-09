import React from "react";
import { connect } from "redux-bundler-react";
import CountBadge from "../badges/CountBade";
import MainMenu from "./MainMenu";

import "./bar.css";

export default connect(
  "selectUser",
  "doGoToSelectSeason",
  "selectSeasons",
  "selectQueryObject",
  "doSignOut",
  ({ user, doGoToSelectSeason, seasons, queryObject, doSignOut }) => (
    <div className="bar flex-row">
      <div className="threeCol-left flex-row flex-start">
        <div className="flex-column left-aligned">
          <MainMenu>
            <div className="mainMenu-item">
              <a href="#/">View Stats</a>
            </div>
            {user && user.uid ? (
              <React.Fragment>
                <div className="mainMenu-item">
                  <a href="#/races/manage">Open Races</a>
                </div>
                <div className="mainMenu-item">
                  <a href="#/seasons/view">Manage Seasons</a>
                </div>
                <div className="mainMenu-item">
                  <a href="#/boats">Manage Boats</a>
                </div>
                <div className="mainMenu-item">
                  <a href="#/" onClick={doSignOut}>
                    Sign out
                  </a>
                </div>
              </React.Fragment>
            ) : (
              <div className="mainMenu-item">
                <a href="#/login">Sign in</a>
              </div>
            )}
          </MainMenu>
        </div>
      </div>
      {!window.location.hash.includes("boats") ? (
        <div className="threeCol-center flex-row">
          <select
            className="select bar-seasons-select"
            onChange={e => {
              doGoToSelectSeason(e.target.value);
            }}
          >
            {seasons.map((season, index) => (
              <option key={season.id + new Date().getTime()} value={season.id}>
                {season.name + (index === 0 ? " - current season" : "")}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="threeCol-right flex-row flex-end" />
    </div>
  )
);
