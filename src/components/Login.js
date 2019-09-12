import React from "react";
import myFirebase from "../foundations/firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import actions from "../actions/";

export default function Login(props) {
  return (
    <div>
      <StyledFirebaseAuth
        uiConfig={actions("user").uiConfig}
        firebaseAuth={myFirebase.auth()}
      />
    </div>
  );
}
