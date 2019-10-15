import myFirebase from "../foundations/firebase";
let user = null;
let pathBeforeLogin;

const init = store => {
  store.doSignIn();
};

const reducer = (state = user, action) => {
  if (action.type === "USER_AUTH_FINISHED") {
    return action.payload;
  }
  if (action.type === "USER_AUTH_STARTED") {
    return action.payload;
  }
  return state;
};

const doSignIn = () => ({ dispatch }) => {
  dispatch({
    type: "USER_AUTH_STARTED",
    payload: null
  });

  myFirebase.auth().onAuthStateChanged(function(_user) {
    // window.DC.debug.log("auth hit", user);
    user = _user;
    dispatch({
      type: "USER_AUTH_FINISHED",
      payload: _user
    });
  });
};

const doSignOut = () => ({ dispatch }) => {
  dispatch({
    type: "USER_SIGN_OUT_STARTED",
    payload: null
  });

  myFirebase
    .auth()
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

  if (state.notAuthorized && !state.user && !state.states.working) {
    if (window.location.hash !== "#/login") {
      pathBeforeLogin = window.location.hash;
      window.location.hash = "#/login";
    }
  } else if (window.location.hash === "#/afterLogin") {
    window.location.hash = pathBeforeLogin || "#/";
  }

  return state;
};

const selectUser = state => state.user;
const selectIsAuthed = state => state.user && state.user.uid;

export default {
  name: "user",
  init,
  reducer,
  doSignIn,
  doSignOut,
  reactUser,
  selectUser,
  selectIsAuthed
};
