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
  return state;
};

const selectRaceEntries = state => state.raceEntries.all;

export default {
  name: "raceEntries",
  init,
  reducer,
  selectRaceEntries
};
