import Entry from "../models/Entry";
import data from "../data";

const reducer = (
  state = { adding: [], currentRace: [], currentSeason: [] },
  action
) => {
  if (action.type === "ENTRIES_ADD") {
    return {
      ...state,
      adding: [...state.adding, action.entry],
      currentRace: [...state.currentRace, ...state.adding, action.entry]
    };
  }
  return state;
};

const doAddRaceEntry = entry => ({ dispatch, store }) => {
  store.dispatch({ type: "ENTRIES_ADD", entry });
};
const selectRaceEntriesAdding = state => state.raceEntries.adding;
const selectRaceEntriesSeason = state => state.raceEntries.currentSeason;
const selectRaceEntriesRace = state => state.raceEntries.currentRace;

export default {
  name: "raceEntries",
  reducer,
  doAddRaceEntry,
  selectRaceEntriesAdding,
  selectRaceEntriesSeason,
  selectRaceEntriesRace
};
