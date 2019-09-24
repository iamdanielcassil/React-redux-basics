import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import "./raceEntries.css";

// test code
const boats = [{ name: "test boat 1" }, { name: "test boat 2" }];
const testEntries = [{ name: "the boat" }, { name: "the other boat" }];

function updateEntrySearch(boats, currentEntries, value) {
  let matches = boats
    .filter(b => !currentEntries.some(e => e.name === b.name))
    .filter(b => b.name.includes(value));

  console.log("matches =", matches);
  return matches;
}

export default connect(
  "selectRaceEntries",
  "doAddRaceEntry",
  ({ raceEntries, doAddRaceEntry }) => {
    const [adding, setAdding] = useState(false);
    const [entryValue, setEntryValue] = useState({ name: "" });
    const [entryBoat, setEntryBoat] = useState([]);

    return (
      <div className="raceEntries">
        <ul>
          {raceEntries.map(entry => (
            <li className="raceEntry">{entry.name}</li>
          ))}
          {testEntries.map(entry => (
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
                    setEntryValue({ name: e.target.value });
                    setEntryBoat(
                      updateEntrySearch(boats, testEntries, e.target.value)
                    );
                  }}
                  value={entryValue.name}
                />
                <button
                  onClick={() => {
                    // doAddRaceEntry(entryValue);
                    testEntries.push(entryValue);
                    setEntryValue({ name: "" });
                    setEntryBoat([]);
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

                      setEntryValue(match);
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
