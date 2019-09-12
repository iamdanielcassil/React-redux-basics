export default (state = { bob: "test" }, action) => {
  if (action) {
    return action.payload ? { ...state, ...action.payload } : state;
  }
};
