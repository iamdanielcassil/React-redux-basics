import React from "react";
import { connect } from "redux-bundler-react";
import CountBadge from "../badges/CountBade";
import MainMenu from "./MainMenu";

import "./bar.css";

export default connect(
  "selectUser", 'doUpdateUrl', 'selectSeasons', 'selectQueryObject',
  ({ user, doUpdateUrl, seasons, queryObject }) => (
    <div className="bar flex-row">
      <div className="threeCol-left flex-row flex-start">
        <div className="flex-column left-aligned">
          <MainMenu>
            <div className="mainMenu-item"><a href="#/">Some Option</a></div>
          </MainMenu>
        </div>
        {user && user.uid ? null : (
          <div className="flex-column">
            <a href="/#/login">sign in</a>
          </div>
        )}
      </div>
      <div className="threeCol-center flex-row"><select
          className="select bar-seasons-select"
          onChange={e => {
            doUpdateUrl({ query: { ...queryObject, seasonId: e.target.value } });
          }}
        >
          {seasons.map((season, index) => (
            <option key={season.id+new Date().getTime()} value={season.id}>
              {season.name + (index === 0 ? ' - current season' : '')}
            </option>
          ))}
        </select></div>
      <div className="threeCol-right flex-row flex-end" />
    </div>
  )
);
