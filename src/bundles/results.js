import Entry from "../models/Entry";
import data from "../data";
let halt = 5;
const init = store => {
  store.subscribe(() => {
    let state = store.getState();

    if (window.location.hash.includes("race")) {
      if (state.races.all.length === 0) {
        return;
      }

      let all = state.races.all.map(race => ({
        name: race.name,
        results: race.results
      }));
      console.log("results up tp date", state.results.all.every(all.includes));
      if (state.results.type !== "race" && halt > 0) {
        halt--;
        store.dispatch({
          type: "STATS_CHANGED",
          payload: { all, type: "race" } //state.races.all.map(race => race.results)
        });
      }
    }
  });
};

const reducer = (state = { all: [] }, action) => {
  console.log("not in results reducer", action);
  if (action.type === "STATS_CHANGED") {
    console.log("in results reducer", action);
    return { ...state, ...action.payload };
  }
  return state;
};

export default {
  name: "results",
  init,
  reducer
};
