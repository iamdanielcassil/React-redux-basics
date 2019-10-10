import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import "./raceEntries.css";

// test code
// const boats = [{ id: 1, name: "test boat 1" }, { id: 2, name: "test boat 2" }];
const testEntries = [
  { id: 101, name: "the boat" },
  { id: 102, name: "the other boat" }
];

function updateEntrySearch(boats, currentEntries, value) {
  let matches = boats
    .filter(
      b =>
        !currentEntries.some(e => e.name.toLowerCase() === b.name.toLowerCase())
    )
    .filter(b => b.name.toLowerCase().includes(value.toLowerCase()));

  console.log("matches =", matches);
  return matches;
}

export default connect(
  "selectRaceEntriesRace",
  "selectCurrentRace",
  "selectBoats",
  "doAddRaceEntry",
  "doRemoveRaceEntry",
  ({
    raceEntriesRace,
    currentRace,
    boats,
    doAddRaceEntry,
    doRemoveRaceEntry,
    ...props
  }) => {
    const [adding, setAdding] = useState(false);
    const [entryValue, setEntryValue] = useState({ name: "" });
    const [entryBoat, setEntryBoat] = useState([]);

    console.log("props", props);
    return (
      <div className="raceEntries">
        <ul>
          {props.race.entries.map(entry => (
            <li key={`${entry.id}-${entry.name}`} className="raceEntry">
              <span>{entry.name}</span>
              <span onClick={() => doRemoveRaceEntry(props.race, entry)}>
                x
              </span>
            </li>
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
                      updateEntrySearch(
                        boats,
                        props.race.entries,
                        e.target.value
                      )
                    );
                  }}
                  value={entryValue.name}
                />
                <div className="raceEntries-searchable-listControls">
                  <button
                    onClick={() => {
                      doAddRaceEntry(props.race, entryValue);
                      // testEntries.push(entryValue);
                      setEntryValue({ name: "" });
                      setEntryBoat([]);
                      setAdding(false);
                    }}
                  >
                    ok
                  </button>
                  {entryBoat.length === 0 ? (
                    <a href="#/boats/new">Add New Boat</a>
                  ) : null}
                </div>
              </span>
              <ul>
                {entryBoat.map(match => (
                  <li
                    key={`${match.id}-${match.name}`}
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
