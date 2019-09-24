import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import "./raceEntries.css";

const boats = [{ name: "test boat 1" }, { name: "test boat 2" }];
function updateEntrySearch(boats, value) {
  let matches = boats.filter(b => b.name.includes(value));

  console.log("matches =", matches);
  return matches;
}

export default connect(
  "selectRaceEntries",
  "doAddRaceEntry",
  ({ raceEntries, doAddRaceEntry }) => {
    const [adding, setAdding] = useState(false);
    const [entryValue, setEntryValue] = useState("");
    const [entryBoat, setEntryBoat] = useState([]);

    return (
      <div className="raceEntries">
        <div className="raceEntries-top">
          <button
            value="Add"
            onClick={e => {
              setAdding(true);
            }}
          >
            +
          </button>
        </div>
        <ul>
          <li className="raceEntry">Test one</li>
          <li className="raceEntry">Test two</li>
          <li className="raceEntry">Test three</li>
          {raceEntries.map(entry => (
            <li className="raceEntry">{entry.name}</li>
          ))}
          {adding ? (
            <li className="raceEntry raceEntries-searchable-text">
              <span>
                <input
                  className="raceEntries-searchable-text"
                  type="text"
                  placeholder="start typing to see boats"
                  onChange={e => {
                    setEntryValue(e.target.value);
                    setEntryBoat(updateEntrySearch(boats, e.target.value));
                  }}
                  value={entryValue}
                />
                <button
                  onClick={() => {
                    doAddRaceEntry();
                    setAdding(false);
                  }}
                >
                  ok
                </button>
              </span>
              <ul>
                {entryBoat.map(match => (
                  <li
                    onClick={e => {
                      setEntryBoat([]);
                      setEntryValue(match.name);
                    }}
                  >
                    {match.name}
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li
              className="raceEntry raceEntries-searchable-text add"
              onClick={() => {
                setAdding(true);
              }}
            >
              <span>Add</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
);
