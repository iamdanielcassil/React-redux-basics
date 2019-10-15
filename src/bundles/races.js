import Race from "../models/Race";

const init = store => {
  // doGetSeasonRaces();
  // data.listen(`seasons/123/races`, races => {
  //   window.DC.debug.log("races fetched", races);
  //   store.dispatch({ type: "RACES_FETCHED", races });
  // });
};
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

// const doGetSeasonRaces = () => ({ store }) => {
//   let state = store.getState();

//   if (state.seasons && state.seasons.current) {
//     data.listen(`seasons/${state.seasons.current.id}/races`, races =>
//       store.dispatch({ type: "RACES_FETCHED", races })
//     );
//   }
// };

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

const doAddRaceEntry = (race, entry) => ({ getState, store }) => {
  // let race = new Race(_race);

  race.addEntry(entry);
  store.doUpdateCurrent(race.get());
};

const doRemoveRaceEntry = (race, entry) => ({ getState, store }) => {
  // let race = new Race(_race);

  race.removeEntry(entry.id);
  store.doUpdateCurrent(race.get());
};

const doStartRace = (raceId, startTime) => ({ store, dispatch }) => {
  dispatch({
    type: "RACE_START",
    payload: { raceId, startTime: startTime.getTime() }
  });
};

const doEndRace = (race, entry, endTime) => ({ store, dispatch }) => {
  let event = store.selectRaceEvent();

  race.results = race.results || [];
  race.results.push({
    ...entry,
    endTime: endTime.getTime(),
    startTime: event.startTime
  });
  store.doSaveRace(new Race(race));
};

const doGoToManageRace = race => ({ store, dispatch }) => {
  store.doUpdateUrl({ pathname: "/", hash: `/races/manage/${race.id}` });
};

const doGoToManageRaces = () => ({ store, dispatch }) => {
  store.doUpdateUrl({ pathname: "/", hash: `/races/manage` });
};

const selectCurrentRace = state => {
  return state.races.current ? { ...state.races.current } : null;
};

const selectRaces = state => state.races.all;
const selectIsEditing = state => state.races.isEditing;
const selectRaceEvent = state => state.races.event;

export default {
  name: "races",
  init,
  reducer,
  doNewRace,
  doSaveRace,
  doSetCurrent,
  doAddRaceEntry,
  doRemoveRaceEntry,
  doUpdateCurrent,
  doStartRace,
  doEndRace,
  doGoToManageRace,
  doGoToManageRaces,
  selectCurrentRace,
  selectIsEditing,
  selectRaces,
  selectRaceEvent
};
