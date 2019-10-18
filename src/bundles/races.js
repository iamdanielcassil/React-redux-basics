import Race from "../models/Race";

const reducer = (state = { all: [], current: null, event: {} }, action) => {
  if (action.type === "NEW_RACE_CREATED") {
    return { ...state, current: action.current };
  }
  if (action.type === "CURRENT_RACE_UPDATED") {
    window.DC.debug.log("CURRENT_RACE_UPDATED", state);
    return state;
  }
  if (action.type === "RACE_SAVE_FINISHED") {
    return state;
  }
  if (action.type === "RACES_FETCH_FINISHED") {
    window.DC.debug.log("races fetched", action.races);
    return { ...state, current: state.current, all: action.races };
  }
  if (action.type === "RACE_SELECTED") {
    window.DC.debug.log("race selected", action.current);
    return {
      ...state,
      current: new Race(action.current),
      isEditing: false
    };
  }
  if (action.type === "RACE_EDITED") {
    return { ...state, isEditing: true };
  }
  if (action.type === "RACE_START") {
    return { ...state, event: { started: true, ...action.payload } };
  }
  if (action.type === "RACE_END") {
    return {
      ...state,
      event: { ...state.event, started: false, ended: true, ...action.payload }
    };
  }

  return state;
};

const doNewRace = seasonId => ({ dispatch }) => {
  dispatch({ type: "NEW_RACE_CREATED", current: new Race({ seasonId }) });
};

const doSetCurrent = raceId => ({ store, dispatch }) => {
  let state = store.getState();

  if (!state.races.current || state.races.current.id !== raceId) {
    let race = state.races.all.find(r => r.id === raceId);

    if (race) {
      dispatch({
        type: "RACE_SELECTED",
        current: race
      });
    }
  }
};

const doSaveRace = race => ({ getState, dispatch }) => {
  dispatch({ type: "RACE_SAVE_STARTED" });
  let wasNew = race.isNew;

  window.DC.debug.log("saveing race", race);
  return race
    .save()
    .then(savedRace => {
      if (wasNew) {
        // do set last save so we can highlight in list savedRace.id
      }

      dispatch({ type: "RACE_SAVE_FINISHED" });
      return savedRace;
    })
    .catch(() => {
      dispatch({ type: "RACE_SAVE_FAILED" });
      dispatch({ type: "RACE_SAVE_FINISHED" });
    });
};

const doUpdateCurrent = raceData => ({ getState, dispatch }) => {
  let race = getState().races.current;
  race.update(raceData);
  dispatch({ type: "CURRENT_RACE_UPDATED" });
};

const doGoToManageRaces = () => ({ store, dispatch }) => {
  store.doUpdateUrl({ pathname: "/", hash: `/races/manage` });
};

const selectCurrentRace = state => {
  return state.races.current ? { ...state.races.current } : null;
};

const selectRaces = state => state.races.all;

export default {
  name: "races",
  reducer,
  doNewRace,
  doSaveRace,
  doSetCurrent,
  doUpdateCurrent,
  doGoToManageRaces,
  selectCurrentRace,
  selectRaces,
};
