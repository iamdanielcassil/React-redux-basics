import React from "react";
import Loading from "./Loading";
import { boundActions } from "../actions/";

export default class Box extends React.Component {
  render() {
    return (
      <div>
        <Loading />
        <input
          type="button"
          onClick={() => {
            boundActions.init();
          }}
          value="Init"
        />
        <input
          type="button"
          onClick={() => {
            boundActions.initAlso();
          }}
          value="more to init"
        />
      </div>
    );
  }
}
