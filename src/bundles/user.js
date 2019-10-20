import firebase from "../foundations/firebase";
import data from "../data";
let user = null;
let pathBeforeLogin;

const init = store => {
  store.doSignIn();
  data.listenToUserClub(snapshot => {
    data.setUserClub(snapshot.groupId);
    store.doUpdateSeasons();
  });
};

const reducer = (state = { user, group: undefined }, action) => {
  if (action.type === "USER_AUTH_FINISHED") {
    return { ...state, user: action.payload };
  }
  if (action.type === "USER_AUTH_STARTED") {
    return { ...state, user: action.payload };
  }
  if (
    action.type === "USER_GROUP_FETCHED" ||
    action.type === "USER_GROUP_UPDATED"
  ) {
    return { ...state, group: action.payload };
  }
  if (action.type === "USER_CLUBS_FETCHED") {
    return { ...state, clubs: action.payload };
  }
  if (action.type === "USER_IS_ADMIN") {
    return { ...state, isAdmin: true };
  }
  if (action.type === "USER_IS_VIEWER") {
    return { ...state, isAdmin: false };
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
    data.getClubs().then(clubs => {
      dispatch({
        type: "USER_CLUBS_FETCHED",
        payload: clubs.map(club => ({ ...club, label: club.name }))
      });
    });
    data.getUserClub().then(groupId => {
      dispatch({
        type: "USER_GROUP_FETCHED",
        payload: groupId
      });
      data
        .getLogIsAdmin()
        .then(() => {
          dispatch({
            type: "USER_IS_ADMIN"
          });
        })
        .catch(() => {
          dispatch({
            type: "USER_IS_VIEWER"
          });
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
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: "USER_SIGN_OUT_FINISHED",
        payload: null
      });
    });
};

const doUpdateClub = key => ({ dispatch }) => {
  return data.updateUserClub(key).then(() => {
    dispatch({
      type: "USER_GROUP_UPDATED",
      payload: key
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
const selectUserClub = state => state.user.group;
const selectClubs = state => state.user.clubs;

export default {
  name: "user",
  init,
  reducer,
  doSignIn,
  doSignOut,
  doUpdateClub,
  reactUser,
  selectUser,
  selectIsAuthed,
  selectUserClub,
  selectClubs
};
