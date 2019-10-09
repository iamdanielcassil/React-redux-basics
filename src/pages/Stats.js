import React from "react";
import StatsAllTime from "../components/stats/StatsAllTime";
import StatsSeason from "../components/stats/StatsSeason";
import StatsLastRace from "../components/stats/StatsLastRace";
import { connect } from "redux-bundler-react";

import "./stats.css";
import "../components/stats/stats.css";

export default connect(
  "selectQueryObject",
  ({ queryObject }) => {
    return (
      <div className="stats">
        <div className="stats-header" />
        <div className="stats-topRow">
          <StatsLastRace />
          <StatsSeason />
        </div>
        <div className="stats-bottomRow">
          <StatsAllTime />
        </div>
      </div>
    );
  }
);
