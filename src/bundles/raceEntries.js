import Entry from "../models/Entry";
import data from "../data";

const init = store => {
  // doGetSeasonRaces();
  // data.listen(`seasons/123/races`, races => {
  //   console.log("races fetched", races);
  //   store.dispatch({ type: "RACES_FETCHED", races });
  // });
};
const reducer = (state = { all: [], current: null }, action) => {
  if (action.type === "NEW_RACE_ENTRY_CREATED") {
    return { all: state.all, current: action.current };
  }

  return state;
};

const doNewRaceEntry = (raceId, boatId) => ({ dispatch }) => {
  dispatch({
    type: "NEW_RACE_ENTRY_CREATED",
    current: new Entry({ raceId, boatId })
  });
};

const doSetCurrentRaceEntry = entry => ({ store, dispatch }) => {
  let state = store.getState();

  if (!state.entries.current || state.enteries.current.id !== entry.id) {
    dispatch({ type: "RACE_ENTRY_SELECTED", current: entry });
  }
};

const doSaveRaceEntry = entry => ({ getState, dispatch }) => {
  dispatch({ type: "RACE_ENTRY_SAVE_STARTED" });
  entry
    .save()
    .then(savedRaceEntry => {
      window.location.hash = `/races/${savedRaceEntry.id}`;
      dispatch({ type: "RACE_ENTRY_SAVE_FINISHED" });
    })
    .catch(() => {
      dispatch({ type: "RACE_ENTRY_SAVE_FAILED" });
      dispatch({ type: "RACE_ENTRY_SAVE_FINISHED" });
    });
};

// const doUpdateCurrentRaceEntry = raceEntryData => ({ getState, dispatch }) => {
//   console.log("doupdatecurrent", getState());
//   let entry = getState().raceEntries.current;
//   entry.update(raceEntryData);
//   dispatch({ type: "CURRENT_RACE_UPDATED" });
// };

const selectCurrentRaceEntry = state => {
  console.log("selectCurrentRace", state.raceEntries.current);
  return state.raceEntries.current ? { ...state.raceEntries.current } : null;
};

const selectRaceEntries = state => state.raceEntries.all;

export default {
  name: "raceEntries",
  init,
  reducer,
  doNewRaceEntry,
  doSaveRaceEntry,
  doSetCurrentRaceEntry,
  // doGetSeasonRaces,
  // doUpdateCurrent,
  selectCurrentRaceEntry,
  selectRaceEntries
};
