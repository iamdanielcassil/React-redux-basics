export default store => next => action => {
  if (action.type === "DEBUG_LOG") {
    console.warn("Error in action: ", action.payload, action.trace);
  }

  if (action.type !== "WORKING") {
    let state = store.getState();
    let working = Object.values(state).some(v => v.working) || action.working;

    store.dispatch({ type: "WORKING", payload: { payload: working } });
    // if (state.working !== working) {
    //   store.dispatch({ type: "WORKING", payload: { working } });
    // }
  }

  next(action);
};
