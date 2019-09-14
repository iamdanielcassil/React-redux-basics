import Race from "../models/Race";

const reducer = (state = { races: { all: [], current: null } }, action) => {
  if (action.type === "NEW_RACE_CREATED") {
    return { current: action.current };
  }
  return state;
};

const doNewRace = seasonId => ({ dispatch }) => {
  console.log("season id ", seasonId);
  dispatch({ type: "NEW_RACE_CREATED", current: new Race({ seasonId }) });
};

const selectCurrentRace = state => state.races.current;

export default {
  name: "races",
  reducer,
  doNewRace,
  selectCurrentRace
};
