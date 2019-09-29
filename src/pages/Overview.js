import React from "react";
import { connect } from "redux-bundler-react";

import "./overview.css";

export default connect(({}) => {
  return (
    <div className="overview">
      <div className="stats-topRow">
        <div className="stats-container stats-season" />
        <div className="stats-container stats-lastRace" />
      </div>
      <div className="stats-bottomRow">
        <div className="stats-container stats-allTime" />
      </div>
    </div>
  );
});
