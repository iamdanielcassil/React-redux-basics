import React from "react";
import { connect } from "redux-bundler-react";

export default connect(
  "doNewRace",
  "selectCurrentRace",
  ({ doNewRace, currentRace }) => {
    console.log(currentRace);
    return (
      <div className="overview">
        <input
          type="button"
          onClick={() => doNewRace("123")}
          value="new race"
        />
        <div>
          {currentRace ? (
            <input type="button" onClick={currentRace.save} value="save" />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);
