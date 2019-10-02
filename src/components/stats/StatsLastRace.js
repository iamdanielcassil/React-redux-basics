import React from "react";

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

export default props => (
  <div className="stats-container stats-lastRace">
    <h3>Last Race</h3>
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
        <li key={t.boat} className="stats-list-item">
          <span>{t.boat}</span>
          <span>{t.owner}</span>
          <span>{t.finishTime}</span>
          <span>{t.phrf}</span>
          <span>{t.rank}</span>
        </li>
      ))}
    </ul>
  </div>
);
