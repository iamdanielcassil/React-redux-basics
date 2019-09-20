import React from "react";
import myFirebase from "../foundations/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "redux-bundler-react";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "#/afterLogin",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
    myFirebase.auth.EmailAuthProvider.PROVIDER_ID,
    myFirebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

export default connect(
  "selectUser",
  "doSignOut",
  "doSignIn",
  ({ user, doSignOut, doSignIn }) => {
    console.log("user", user);
    if (user && user.uid) {
      let shouldLogout = window.confirm(
        `You are already signed in as user: ${
          user.displayName
        }.  Would you like to sign in as another user?`
      );
      if (shouldLogout) {
        doSignOut();
        doSignIn();
      } else {
        window.history.back();
      }
    }
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={myFirebase.auth()}
        />
      </div>
    );
  }
);
