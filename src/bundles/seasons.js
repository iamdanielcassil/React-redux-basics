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
    let sortseasons = seasons.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
    console.log("seasons fetched", seasons, sortseasons);
    store.dispatch({ type: "SEASONS_FETCHED", seasons });

    let currentId = store.selectQueryObject();
    store.doSetCurrentSeason(currentId);
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

const doSetCurrentSeason = seasonId => ({ store, dispatch }) => {
  let state = store.getState();

  console.log("state in seasons", state);
  if (state.seasons.all.length <= 0) {
    return;
  }

  if (state.seasons.current && state.seasons.current.id === seasonId) {
    return;
  }

  let season = state.seasons.all.find(s => s.id === seasonId);

  if (!season) {
    season = state.seasons.all[0];
  }

  dispatch({ type: "SEASON_SELECTED", current: season });
  store.doUpdateUrl({ query: { ...store.selectQueryObject(), seasonId: season.id } });
  store.dispatch({ type: "RACES_FETCH_STARTED" });
  data.listen(`seasons/${season.id}/races`, races =>
    store.dispatch({ type: "RACES_FETCH_FINISHED", races })
  );
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
