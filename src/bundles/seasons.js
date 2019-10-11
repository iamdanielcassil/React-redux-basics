import Season from "../models/Season";
import data from "../data";

const init = store => {
  let state = store.getState();

  data.listen(`seasons`, seasons => {
    let sortseasons = seasons.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
    window.DC.debug.log("seasons fetched", seasons, sortseasons);
    store.dispatch({ type: "SEASONS_FETCHED", seasons });
    if (!state.seasons.current) {
      if (store.selectQueryObject().seasonId) {
        store.doGoToSelectSeason(store.selectQueryObject().seasonId);
      } else {
        store.doGoToSelectSeason(sortseasons[0].id);
      }
    }
  });
};
const reducer = (state = { all: [], current: null }, action) => {
  if (action.type === "NEW_SEASON_CREATED") {
    return { all: state.all, current: action.current };
  }
  if (action.type === "CURRENT_SEASON_UPDATED") {
    window.DC.debug.log("CURRENT_SEASON_UPDATED", state);
    return state;
  }
  if (action.type === "SEASON_SAVE_FINISHED") {
    return state;
  }
  if (action.type === "SEASONS_FETCHED") {
    window.DC.debug.log("SEASONs fetched", action.seasons);
    return { current: state.current, all: action.seasons };
  }
  if (action.type === "SEASON_SELECTED") {
    window.DC.debug.log("SEASON selected", action.current);
    return {
      current: new Season(action.payload),
      all: state.all,
      isEditing: false
    };
  }
  if (action.type === "SEASON_SELECTED_NOT_FOUND") {
    console.log(`Season id: ${action.payload} not found`);
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

const doGoToSelectSeason = id => ({ dispatch, store }) => {
  let seasons = store.selectSeasons();
  let selectedSeason = seasons.find(s => s.id === id);

  if (!selectedSeason) {
    dispatch({ type: "SEASON_SELECTED_NOT_FOUND", payload: id });
    return;
  }

  dispatch({ type: "SEASON_SELECTED", payload: selectedSeason });
  dispatch({ type: "RACES_FETCH_STARTED" });
  data.listen(`seasons/${id}/races`, races =>
    dispatch({ type: "RACES_FETCH_FINISHED", races })
  );

  store.doUpdateUrl({ query: { ...store.queryObject, seasonId: id } });
};

const doSaveSeason = season => ({ getState, dispatch }) => {
  dispatch({ type: "RACE_SAVE_STARTED" });
  season
    .save()
    .then(savedSeason => {
      dispatch({ type: "SEASON_SAVE_FINISHED" });
      window.location.hash = `/seasons/${savedSeason.id}`;
    })
    .catch(() => {
      dispatch({ type: "SEASON_SAVE_FAILED" });
      dispatch({ type: "SEASON_SAVE_FINISHED" });
    });
};

const doUpdateCurrent = seasonData => ({ getState, dispatch }) => {
  window.DC.debug.log("doupdatecurrent", getState());
  let season = getState().seasons.current;
  season.update(seasonData);
  dispatch({ type: "CURRENT_SEASON_UPDATED" });
};

const doSelectCurrentSeason = () => ({ store }) => {
  let seasonId = store.selectQueryObject().seasonId;

  if (!seasonId) {
    return;
  }

  return store
    .selectSeasons()
    .find(s => s.id === store.selectQueryObject().seasonId);
};

const selectCurrentSeason = state => state.seasons.current;
const selectSeasons = state => state.seasons.all;

export default {
  name: "seasons",
  init,
  reducer,
  doNewSeason,
  doSaveSeason,
  doUpdateCurrent,
  doGoToSelectSeason,
  doSelectCurrentSeason,
  selectCurrentSeason,
  selectSeasons
};
