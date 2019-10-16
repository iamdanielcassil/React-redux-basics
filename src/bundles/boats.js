import Boat from "../models/Boat";
import data from "../data";

const init = store => {
  store.dispatch({ type: "BOATS_FETCH_STARTED", boats: [] });
  data.listen(`boats`, boats => {
    window.DC.debug.log("boats fetch finished");
    store.dispatch({ type: "BOATS_FETCH_FINISHED", boats: boats.sort() });
  });
};

const reducer = (state = { all: [] }, action) => {
  if (action.type === "BOATS_CURRENT_SELECTED") {
    return { ...state, current: action.boat };
  }
  if (action.type === "BOATS_FETCH_FINISHED") {
    return { ...state, all: action.boats };
  }
  return state;
};

const doGoToSelectBoat = boatId => ({ dispatch, store }) => {
  let boat = store.getState().boats.all.find(b => b.id === boatId);

  dispatch({ type: "BOATS_CURRENT_SELECTED", boat });
  store.doUpdateUrl({ pathname: "/", hash: "/boats/" + boatId });
};

const doSetCurrentBoat = boatId => ({ store, dispatch }) => {
  let state = store.getState();

  if (!state.boats.current || state.boats.current.id !== boatId) {
    let boat = state.boats.all.find(b => b.id === boatId);

    dispatch({
      type: "BOATS_CURRENT_SELECTED",
      boat: new Boat(boat)
    });
  }
};

const doSaveBoat = boat => ({ dispatch, store }) => {
  if (
    boat.isNew ||
    window.confirm(
      `Are you sure you want to save changes to boat: ${boat.name}`
    )
  ) {
    store.dispatch({ type: "BOATS_SAVE_STARTED" });
    return boat
      .save()
      .then(savedBoat => {
        window.DC.debug.log("save boat", savedBoat);
        store.dispatch({ type: "BOATS_CURRENT_SELECTED", boat: savedBoat });
        store.dispatch({ type: "BOATS_SAVE_FINISHED" });
      })
      .catch(error => {
        window.DC.debug.log("save boat failed", error);
        store.dispatch({ type: "BOATS_SAVE_FINISHED", boat: {} });
        store.dispatch({ type: "BOATS_SAVE_FAILED" });
      });
  }
};

const selectCurrentBoat = state => state.boats.current;
const selectBoats = state => state.boats.all;

export default {
  name: "boats",
  init,
  reducer,
  selectCurrentBoat,
  selectBoats,
  doGoToSelectBoat,
  doSaveBoat,
  doSetCurrentBoat
};
