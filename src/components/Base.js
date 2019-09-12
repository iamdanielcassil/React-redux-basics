import React from "react";
import Loading from "./Loading";
import { connect } from "react-redux";
import actions, { boundActions } from "../actions/";
import Login from "./Login";
import data from "../actions/data";

const Base = props => {
  console.log("base render", props.user);
  // boundActions.init();
  if (props.user) {
    return (
      <div>
        <Loading />
        <input
          type="button"
          onClick={() => {
            let q = data.getUserQuery();

            console.log(q);
          }}
          value="Init"
        />
        <input
          type="button"
          onClick={() => {
            // boundActions.initAlso();
          }}
          value="more to init"
        />
      </div>
    );
  } else if (!props.wokring) {
    console.log("login", props);
    return <Login />;
  } else {
    console.log("loading", props);
    return <Loading />;
  }
};

function select(state) {
  console.log("base, state", state);
  return {
    user: state.user,
    working: state.working.payload
  };
}

export default connect(select)(Base);
