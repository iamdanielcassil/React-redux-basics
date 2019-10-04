import React from "react";
import { connect } from "redux-bundler-react";

const testData = [
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    points: 140,
    rank: 1,
    seasonRank: 3
  }
];

export default connect(
  "selectSeasons",
  "doUpdateUrl",
  ({ seasons, doUpdateUrl }) => (
    <div className="stats-container stats-season">
      <div className="stats-header">
        
        <span>Season Stats</span>
      </div>
      <ul className="stats-list">
        <li className="stats-list-item">
          <span>Boat</span>
          <span>Owner</span>

          <span>Points</span>
          <span>Rank</span>
        </li>
      </ul>
      <ul className="stats-list">
        {testData.map(t => (
          <li key={t.boat+new Date().getTime()} className="stats-list-item">
            <span>{t.boat}</span>
            <span>{t.owner}</span>

            <span>{t.points}</span>
            <span>{t.rank}</span>
          </li>
        ))}
      </ul>
    </div>
  )
);
