export default store => next => action => {
  if (action.type === "DEBUG_LOG") {
    console.warn("Error in action: ", action.payload, action.trace);
  }
  next(action);
};
