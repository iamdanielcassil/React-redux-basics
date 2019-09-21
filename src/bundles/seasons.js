import Season from "../models/Season";
import data from "../data";

const init = store => {
  let state = store.getState();

  // if (state.seasons && state.seasons.current) {
  //   data.listen(`seasons/${state.seasons.current.id}/races`, races =>
  //     store.dispatch({ type: "RACES_FETCHED", races })
  //   );
  // }
  data.listen(`seasons`, seasons => {
    console.log("seasons fetched", seasons);
    store.dispatch({ type: "SEASONS_FETCHED", seasons });
  });
};
const reducer = (state = { all: [], current: null }, action) => {
  if (action.type === "NEW_SEASON_CREATED") {
    return { all: state.all, current: action.current };
  }
  if (action.type === "CURRENT_SEASON_UPDATED") {
    console.log("CURRENT_SEASON_UPDATED", state);
    return state;
  }
  if (action.type === "SEASON_SAVE_FINISHED") {
    return state;
  }
  if (action.type === "SEASONS_FETCHED") {
    console.log("SEASONs fetched", action.seasons);
    return { current: state.current, all: action.seasons };
  }
  if (action.type === "SEASON_SELECTED") {
    console.log("SEASON selected", action.current);
    return {
      current: new Season(action.current),
      all: state.all,
      isEditing: false
    };
  }
  if (action.type === "SEASON_EDITED") {
    return { ...state, isEditing: true };
  }
  return state;
};

const doNewSeason = () => ({ dispatch }) => {
  dispatch({ type: "NEW_SEASON_CREATED", current: new Season({}) });
  // window.location.pathname = "/#/races/new";
};

const doSetCurrentSeason = season => ({ store, dispatch }) => {
  let state = store.getState();

  if (!state.seasons.current || state.seasons.current.id !== season.id) {
    dispatch({ type: "SEASON_SELECTED", current: season });
    let state = store.getState();

    if (state.seasons && state.seasons.current) {
      data.listen(`seasons/${state.seasons.current.id}/races`, races =>
        store.dispatch({ type: "RACES_FETCHED", races })
      );
    }
  }
};

const doSaveSeason = season => ({ getState, dispatch }) => {
  dispatch({ type: "RACE_SAVE_STARTED" });
  season
    .save()
    .then(() => {
      dispatch({ type: "SEASON_SAVE_FINISHED" });
      window.location.hash = `seasons/${season.id}`;
    })
    .catch(() => {
      dispatch({ type: "SEASON_SAVE_FAILED" });
      dispatch({ type: "SEASON_SAVE_FINISHED" });
    });
};

const doUpdateCurrent = seasonData => ({ getState, dispatch }) => {
  console.log("doupdatecurrent", getState());
  let season = getState().seasons.current;
  season.update(seasonData);
  dispatch({ type: "CURRENT_SEASON_UPDATED" });
};

const selectCurrentSeason = state => {
  console.log("selectCurrentSeason", state.seasons.current);
  return state.seasons.current ? { ...state.seasons.current } : null;
};

const selectSeasons = state => state.seasons.all;

export default {
  name: "seasons",
  init,
  reducer,
  doNewSeason,
  doSaveSeason,
  doSetCurrentSeason,
  doUpdateCurrent,
  selectCurrentSeason,
  selectSeasons
};
