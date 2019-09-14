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
const reducer = (state = { all: [], current: null }, action) => {
  if (action.type === "NEW_RACE_CREATED") {
    return { all: state.all, current: action.current };
  }
  if (action.type === "CURRENT_RACE_UPDATED") {
    console.log("CURRENT_RACE_UPDATED", state);
    return state;
  }
  if (action.type === "RACE_SAVE_FINISHED") {
    return { current: undefined };
  }
  if (action.type === "RACES_FETCHED") {
    console.log("races fetched", action.races);
    return { current: state.current, all: action.races };
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
  race
    .save()
    .then(() => {
      dispatch({ type: "RACE_SAVE_FINISHED" });
    })
    .catch(() => {
      dispatch({ type: "RACE_SAVE_FAILED" });
      dispatch({ type: "RACE_SAVE_FINISHED" });
    });
};

const doUpdateCurrent = raceData => ({ getState, dispatch }) => {
  console.log("doupdatecurrent", getState());
  let race = getState().races.current;
  race.update(raceData);
  dispatch({ type: "CURRENT_RACE_UPDATED" });
};

const selectCurrentRace = state => {
  console.log("selectCurrentRace", state);
  return state.races.current ? { ...state.races.current } : null;
};
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
