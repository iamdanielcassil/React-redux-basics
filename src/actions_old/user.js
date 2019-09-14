import store from "../store";
import myFirebase from "../foundations/firebase";

store.dispatch({
  type: "USER_AUTH_STARTED",
  payload: null,
  working: true
});

window.setTimeout(() => {
  myFirebase.auth().onAuthStateChanged(function(user) {
    // console.log("auth hit", user);
    if (user) {
      store.dispatch({
        type: "USER_AUTHED",
        payload: user,
        working: false
      });
    }
  });
}, 1000);

export default {
  uiConfig: {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
      myFirebase.auth.EmailAuthProvider.PROVIDER_ID,
      myFirebase.auth.PhoneAuthProvider.PROVIDER_ID
    ]
  },
  set: user => {
    return {
      type: "USER_SIGNED_IN",
      payload: user,
      working: false
    };
  },
  signout: () => {
    store.dispatch({
      type: "USER_SIGN_OUT_STARTED",
      payload: null,
      working: true
    });

    myFirebase
      .auth()
      .signOut()
      .then(() => {
        store.dispatch({
          type: "USER_SIGNED_OUT",
          payload: null,
          working: false
        });
      });
  }
};
