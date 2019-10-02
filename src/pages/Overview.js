import React from "react";
import StatsAllTime from "../components/stats/StatsAllTime";
import StatsSeason from "../components/stats/StatsSeason";
import StatsLastRace from "../components/stats/StatsLastRace";
import { connect } from "redux-bundler-react";

import "./overview.css";
import "../components/stats/stats.css";

export default connect(({}) => {
  return (
    <div className="overview">
      <div className="stats-topRow">
        <StatsSeason />
        <StatsLastRace />
      </div>
      <div className="stats-bottomRow">
        <StatsAllTime />
      </div>
    </div>
  );
});
