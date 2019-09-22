import React from "react";
import { connect } from "redux-bundler-react";
import "./raceEntries.css";

export default connect(
  "selectRaces",
  ({ races }) => {
    return <div className="raceEntries">yay</div>;
  }
);
