import Race from "../models/Race";
import data from "../data";

const init = store => {
  let state = store.getState();

  // if (state.seasons && state.seasons.current) {
  //   data.listen(`seasons/${state.seasons.current.id}/races`, races =>
  //     store.dispatch({ type: "RACES_FETCHED", races })
  //   );
  // }
  data.listen(`seasons/123/races`, races => {
    console.log("races fetched", races);
    store.dispatch({ type: "RACES_FETCHED", races });
  });
};
const reducer = (state = { races: { all: [], current: null } }, action) => {
  if (action.type === "NEW_RACE_CREATED") {
    return { current: action.current };
  }
  if (action.type === "RACE_SAVE_FINISHED") {
    return { current: undefined };
  }
  if (action.type === "RACES_FETCHED") {
    console.log("races fetched", action.races);
    return { all: action.races };
  }
  return state;
};

const doNewRace = seasonId => ({ dispatch }) => {
  console.log("season id ", seasonId);
  dispatch({ type: "NEW_RACE_CREATED", current: new Race({ seasonId }) });
};

const doSaveRace = () => ({ getState, dispatch }) => {
  let race = getState().races.current;
  dispatch({ type: "RACE_SAVE_STARTED" });
  race.save().then(() => {
    dispatch({ type: "RACE_SAVE_FINISHED" });
  });
};

const doUpdateCurrent = raceData => ({ getState, dispatch }) => {
  let race = getState().races.current;

  dispatch({ type: "CURRENT_RACE_UPDATED", current: race.update(raceData) });
};

const selectCurrentRace = state => state.races.current;
const selectRaces = state => state.races.all;

export default {
  name: "races",
  init,
  reducer,
  doNewRace,
  doSaveRace,
  doUpdateCurrent,
  selectCurrentRace,
  selectRaces
};
