import firebase from "../foundations/firebase";
import data from "../data";
let user = null;
let pathBeforeLogin;

const init = store => {
  store.doSignIn();
};

const reducer = (state = { user, group: undefined }, action) => {
  if (action.type === "USER_AUTH_FINISHED") {
    return { ...state, user: action.payload };
  }
  if (action.type === "USER_AUTH_STARTED") {
    return { ...state, user: action.payload };
  }
  if (action.type === "USER_GROUP_FETCHED") {
    return { ...state, group: action.payload };
  }
  return state;
};

const doSignIn = () => ({ dispatch }) => {
  dispatch({
    type: "USER_AUTH_STARTED",
    payload: null
  });
  data.clearUserGroup();

  let auth = firebase.auth();
  auth.onAuthStateChanged(function(_user) {
    // window.DC.debug.log("auth hit", user);
    user = _user;
    dispatch({
      type: "USER_AUTH_FINISHED",
      payload: _user
    });
    data.init(_user);
    data.getUserGroup().then(groupId => {
      dispatch({
        type: "USER_GROUP_FETCHED",
        payload: groupId
      });
    });
  });
  return auth;
};

const doSignOut = () => ({ dispatch }) => {
  dispatch({
    type: "USER_SIGN_OUT_STARTED",
    payload: null
  });
  firebase.auth()
    .signOut()
    .then(() => {
      dispatch({
        type: "USER_SIGN_OUT_FINISHED",
        payload: null
      });
    });
};

const reactUser = () => store => {
  if (!store) {
    return {};
  }

  let state = store.getState();

  if (state.notAuthorized && !state.user.user && !state.states.working) {
    if (window.location.hash !== "#/login") {
      pathBeforeLogin = window.location.hash;
      window.location.hash = "#/login";
    }
  } else if (window.location.hash === "#/afterLogin") {
    window.location.hash = pathBeforeLogin || "#/";
  }

  return state;
};

const selectUser = state => state.user.user;
const selectIsAuthed = state =>
  state.user.user !== null && state.user.user.uid !== undefined;
const selectUserGroup = state => state.user.group;

export default {
  name: "user",
  init,
  reducer,
  doSignIn,
  doSignOut,
  reactUser,
  selectUser,
  selectIsAuthed,
  selectUserGroup
};
