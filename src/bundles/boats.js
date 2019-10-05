import Boat from "../models/Boat";
import data from "../data";

const init = store => {
  store.dispatch({ type: "BOATS_FETCH_STARTED", boats: [] });
  data.listen(`boats`, boats => {
    console.log("boats fetch finished");
    store.dispatch({ type: "BOATS_FETCH_FINISHED", boats: boats.sort() });
  });
};

const reducer = (state = { all: [], current: [] }, action) => {
  if (action.type === "BOATS_CURRENT_SELECTED") {
    return { ...state, current: action.boat };
  }
  if (action.type === "BOATS_FETCH_FINISHED") {
    return { ...state, all: action.boats };
  }
  return state;
};

const doGotToAddNewBoat = () => ({ dispatch, store }) => {
  store.doUpdateUrl({ pathname: "/", hash: "/boats/new" });
};

const doGoToEditBoat = boatId => ({ dispatch, store }) => {
  store.doUpdateUrl({ pathname: "/", hash: `/boats/${boatId}/edit` });
};

const doGoToSelectBoat = boatId => ({ dispatch, store }) => {
  let boat = store.getState().boats.all.find(b => b.id === boatId);

  dispatch({ type: "BOATS_CURRENT_SELECTED", boat });
  store.doUpdateUrl({ pathname: "/", hash: "/boats/" + boatId });
};

const doSaveBoat = boat => ({ dispatch, store }) => {
  store.dispatch({ type: "BOATS_SAVE_STARTED" });
  new Boat(boat)
    .save()
    .then(savedBoat => {
      console.log("save boat", savedBoat);
      store.dispatch({ type: "BOATS_CURRENT_SELECTED", boat: savedBoat });
      store.dispatch({ type: "BOATS_SAVE_FINISHED" });
    })
    .catch(error => {
      console.log("save boat failed", error);
      store.dispatch({ type: "BOATS_SAVE_FINISHED", boat: {} });
      store.dispatch({ type: "BOATS_SAVE_FAILED" });
    });
};

const selectCurrentBoat = state => state.boats.current;
const selectBoats = state => state.boats.all;

export default {
  name: "boats",
  init,
  reducer,
  selectCurrentBoat,
  selectBoats,
  doGotToAddNewBoat,
  doGoToEditBoat,
  doGoToSelectBoat,
  doSaveBoat
};
