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
    <ul className="list">
      {testData.map(t => (
        <li key={t.boat + new Date().getTime()} className="list-item">
          <span>{t.boat}</span>
          <span>{t.owner}</span>

          <span>{t.points}</span>
          <span>{t.rank}</span>
        </li>
      ))}
    </ul>
  )
);
