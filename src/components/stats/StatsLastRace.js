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
    <ul className="stats-list">
      <li className="stats-list-item">
        <span>boat</span>
        <span>owner</span>
        <span>finish time</span>
        <span>phrf</span>
        <span>rank</span>
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
