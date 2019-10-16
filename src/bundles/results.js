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

export default {
  name: "stats",
  doSelectStats
};
