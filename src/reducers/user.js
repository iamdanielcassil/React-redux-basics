// the reducer itself
export default (state = {}, action) => {
  if (action.type === "USER_AUTHED") {
    return { ...action.payload };
  }
  if (action.type === "USER_AUTH_STARTED") {
    return { ...action.payload };
  }
  return state;
};
