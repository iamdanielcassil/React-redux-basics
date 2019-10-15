import Entry from "../models/Entry";
import data from "../data";
let halt = 5;
// const init = store => {
//   store.subscribe(() => {
//     let state = store.getState();

//     if (window.location.hash.includes("race")) {
//       if (state.races.all.length === 0) {
//         return;
//       }

//       let all = state.races.all.map(race => ({
//         name: race.name,
//         results: race.results
//       }));

//       if (state.results.type !== "race" && halt > 0) {
//         halt--;
//         store.dispatch({
//           type: "STATS_CHANGED",
//           payload: { all, type: "race" } //state.races.all.map(race => race.results)
//         });
//       }
//     }
//   });
// };

// const reducer = (state = { all: [] }, action) => {
//   console.log("not in results reducer", action);
//   if (action.type === "STATS_CHANGED") {
//     console.log("in results reducer", action);
//     return { ...state, ...action.payload };
//   }
//   return state;
// };

const doSelectStats = hash => ({ store, dispatch }) => {
  let state = store.getState();
  let all;

  if (hash.includes("races")) {
    all = state.races.all.map(race => ({
      name: race.name,
      results: race.results
    }));
  } else {
    all = [];
  }

  return all;
};

const selectResults = state => state.results.all;

export default {
  name: "stats",
  doSelectStats
  // init,
  // reducer,
  // selectResults
};
