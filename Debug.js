import React from "react";
import { connect } from "react-redux";

function Loading(props) {
  if (props.loading) {
    return <div>Inited</div>;
  }
  return <div>not inited</div>;
}

export default connect(state => {
  console.log(state);
  return { ...state.box };
})(Loading);
