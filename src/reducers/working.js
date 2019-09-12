// the reducer itself
export default (state = false, action) => {
  if (action.type === "WORKING") {
    return { ...action.payload };
  }
  return state;
};
