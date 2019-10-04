import React, {useEffect} from "react";
import StatsAllTime from "../components/stats/StatsAllTime";
import StatsSeason from "../components/stats/StatsSeason";
import StatsLastRace from "../components/stats/StatsLastRace";
import { connect } from "redux-bundler-react";

import "./overview.css";
import "../components/stats/stats.css";

export default connect('doUpdateUrl', 'selectSeasons', 'selectQueryObject', ({doUpdateUrl, seasons, queryObject}) => {
  useEffect(() => {
    console.log('test his overview load', queryObject.seasonId)
  },[queryObject.seasonId])
  
  return (
    <div className="overview">
    <div className="overview-header">
    
    </div>
      <div className="stats-topRow">
       <StatsLastRace />
        <StatsSeason />
      </div>
      <div className="stats-bottomRow">
        <StatsAllTime />
      </div>
    </div>
  );
});
