import React, { useState } from "react";
import { connect } from "redux-bundler-react";

const testData = [
  {
    boat: "Something big",
    owner: "Dohn Doe",
    finishTime: new Date().getTime(),
    phrf: 140,
    rank: 1,
    seasonRank: 3
  }
];

export default connect(
  "selectRaces",
  "doGoToSelectBoat",
  ({ races, doGoToSelectBoat }) => {
    const [race, setRace] = useState(races ? races[0] : undefined);
    return (
      <div className="stats-container stats-lastRace">
        <div className="stats-header">
          <select
            className="stats-race-select"
            value={race && race.id}
            onChange={e => {
              setRace(races.find(r => r.id === e.target.value));
            }}
          >
            {races.map((race, index) => (
              <option key={race.id} value={race.id}>
                {race.name + (index === 0 ? " - current race" : "")}
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
          {race && race.results ? (
            race.results.map(t => (
              <li
                key={t.boat + new Date().getTime()}
                className="stats-list-item"
              >
                <span
                  className="clickable"
                  onClick={() => doGoToSelectBoat(t.boat)}
                >
                  {t.boat}
                </span>
                <span>{t.owner}</span>
                <span>{t.finishTime}</span>
                <span>{t.phrf}</span>
                <span>{t.rank}</span>
              </li>
            ))
          ) : (
            <li className="stats-list-empty">No Results</li>
          )}
        </ul>
      </div>
    );
  }
);
