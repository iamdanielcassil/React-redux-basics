import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import AutoSelectList from "../AutoSelectList";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import "./raceEntries.css";

function updateEntrySearch(boats, currentEntries, value) {
  let matches = boats
    .filter(
      b =>
        !currentEntries.some(e => e.name.toLowerCase() === b.name.toLowerCase())
    )
    .filter(b => b.name.toLowerCase().includes(value.toLowerCase()));

  window.DC.debug.log("matches =", matches);
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
    // const [adding, setAdding] = useState(false);
    // const [entryValue, setEntryValue] = useState({ name: "" });
    // const [entryBoat, setEntryBoat] = useState([]);
    const [selecedSuggestion, setSelectedSuggestion] = useState();

    useEffect(() => {}, [selecedSuggestion]);

    window.DC.debug.log("props", props);
    return (
      <React.Fragment>
        <AutoSelectList
          suggestions={boats.map(b => ({ label: b.name }))}
          onSuggestionSelected={suggestion => {
            console.log("set selected", suggestion);
            setSelectedSuggestion(suggestion.suggestionValue);
          }}
        />
        {selecedSuggestion ? (
          <IconButton
            aria-label="Add"
            onClick={() => {
              let boat = boats.find(b => b.name === selecedSuggestion);

              if (boat) {
                console.log("add boat", boats, boat, selecedSuggestion);
                props.race.addEntry(boat);
                setSelectedSuggestion(undefined);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        ) : null}
        <List>
          {props.race.entries.map(entry => (
            <ListItem>
              <ListItemText primary={entry.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {/* <ul>
          {props.race.entries.map(entry => (
            <li key={`${entry.id}-${entry.name}`} className="raceEntry">
              <span>{entry.name}</span>
              <span onClick={() => props.race.removeEntry(entry)}>x</span>
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
                      // doAddRaceEntry(props.race, entryValue);
                      props.race.addEntry(entryValue);
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
        </ul> */}
      </React.Fragment>
    );
  }
);
