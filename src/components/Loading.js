import React from "react";
import { connect } from "react-redux";

function Loading(props) {
  if (props.loading) {
    return <div>Inited</div>;
  }
  return <div>not inited</div>;
}

function select(state) {
  return {
    loading:
      state.base.loading || Object.values(state.base).some(v => v.loading)
  };
}

export default connect(select)(Loading);
