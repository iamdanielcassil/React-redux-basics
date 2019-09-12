// starting state for our URL pathname reducer
const initialState = {
  pathname:
    typeof window.location !== "undefined" ? window.location.pathname : "/"
};

// the reducer itself
export default (state = initialState, action) => {
  if (action.type === "UPDATE_URL") {
    return { pathname: action.payload };
  }
  return state;
};
// starting state for our URL pathname reducer
const initialState = {
  pathname:
    typeof window.location !== "undefined" ? window.location.pathname : "/"
};

// the reducer itself
export default (state = initialState, action) => {
  if (action.type === "UPDATE_URL") {
    return { pathname: action.payload };
  }
  return state;
};
