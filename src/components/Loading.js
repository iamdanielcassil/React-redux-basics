import React from "react";
import { connect } from "react-redux";

function Loading(props) {
  if (props.working) {
    return <div>working</div>;
  }
  return null;
}

function select(state) {
  return {
    working: state.working.payload
  };
}

export default connect(select)(Loading);
