import Entry from "../models/Entry";
import data from "../data";

const reducer = (state = { all: [], currentRace: [], currentSeason: [] }, action) => {
  return state;
};

const selectRaceEntries = state => state.raceEntries.all;
const selectRaceEntriesSeason = state => state.raceEntries.currentSeason;
const selectRaceEntriesRace = state => state.raceEntries.currentRace;

export default {
  name: "raceEntries",
  reducer,
  selectRaceEntries,
  selectRaceEntriesSeason,
  selectRaceEntriesRace
};
