import React from "react";
import {auth} from "../foundations/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "redux-bundler-react";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "#/races/stats",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.EmailAuthProvider.PROVIDER_ID,
    auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

export default connect(
  "selectUser",
  "doSignOut",
  "doSignIn",
  ({ user, doSignOut, doSignIn }) => {
    window.DC.debug.log("user", user);

    if (user && user.uid) {
      doSignOut();
    }
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={doSignIn()} />
      </div>
    );
  }
);
