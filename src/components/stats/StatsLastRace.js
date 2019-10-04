import React from "react";
import { connect } from "redux-bundler-react";

const testData = [
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    phrf: 140,
    rank: 1,
    seasonRank: 3
  },
  {
    boat: "Something small",
    owner: "Bob Doe",
    finishTime: new Date().getTime(),
    phrf: 120,
    rank: 2,
    seasonRank: 2
  },
  {
    boat: "Something else",
    owner: "Frank Doe",
    finishTime: new Date().getTime(),
    phrf: 190,
    rank: 3,
    seasonRank: 1
  },
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    phrf: 140,
    rank: 1,
    seasonRank: 3
  },
  {
    boat: "Something small",
    owner: "Bob Doe",
    finishTime: new Date().getTime(),
    phrf: 120,
    rank: 2,
    seasonRank: 2
  },
  {
    boat: "Something else",
    owner: "Frank Doe",
    finishTime: new Date().getTime(),
    phrf: 190,
    rank: 3,
    seasonRank: 1
  },
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    phrf: 140,
    rank: 1,
    seasonRank: 3
  },
  {
    boat: "Something small",
    owner: "Bob Doe",
    finishTime: new Date().getTime(),
    phrf: 120,
    rank: 2,
    seasonRank: 2
  },
  {
    boat: "Something else",
    owner: "Frank Doe",
    finishTime: new Date().getTime(),
    phrf: 190,
    rank: 3,
    seasonRank: 1
  },
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    phrf: 140,
    rank: 1,
    seasonRank: 3
  },
  {
    boat: "Something small",
    owner: "Bob Doe",
    finishTime: new Date().getTime(),
    phrf: 120,
    rank: 2,
    seasonRank: 2
  },
  {
    boat: "Something else",
    owner: "Frank Doe",
    finishTime: new Date().getTime(),
    phrf: 190,
    rank: 3,
    seasonRank: 1
  }
];

export default connect(
  "selectRaces",
  "doUpdateUrl",
  'doGoToSelectBoat',
  ({ races, doUpdateUrl, doGoToSelectBoat }) => (
  <div className="stats-container stats-lastRace">
    <div className="stats-header">
    <select
          className="stats-race-select"
          onChange={e => {
            doUpdateUrl({ query: { raceId: e.target.value } });
          }}
        >
          {races.map((season, index) => (
            <option key={season.id+new Date().getTime()} value={season.id}>
              {season.name + (index === 0 ? ' - current race' : '')}
            </option>
          ))}
        </select>
      <span>Race Stats</span>
    </div>

    <ul className="stats-list">
      <li className="stats-list-item">
        <span>Boat</span>
        <span>Owner</span>
        <span>Finish Time</span>
        <span>PHRF</span>
        <span>Rank</span>
      </li>
    </ul>
    <ul className="stats-list">
      {testData.map(t => (
        <li key={t.boat+new Date().getTime()} className="stats-list-item">
          <span className="clickable" onClick={() => doGoToSelectBoat(t.boat)}>{t.boat}</span>
          <span>{t.owner}</span>
          <span>{t.finishTime}</span>
          <span>{t.phrf}</span>
          <span>{t.rank}</span>
        </li>
      ))}
    </ul>
  </div>
));
