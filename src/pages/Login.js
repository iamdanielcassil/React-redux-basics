import React from "react";
import myFirebase from "../foundations/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "#afterLogin",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
    myFirebase.auth.EmailAuthProvider.PROVIDER_ID,
    myFirebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

export default function Login(props) {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={myFirebase.auth()}
      />
    </div>
  );
}
