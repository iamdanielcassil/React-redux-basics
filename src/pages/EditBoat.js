import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";

export default connect(
  "doSaveBoat",
  "selectCurrentBoat",
  ({ doSaveBoat, currentBoat }) => {
    const [boat, setBoat] = useState(currentBoat || {});

    return (
      <div className="form">
        <label htmlFor="name">
          Name
          <input
            id="name"
            className="field"
            type="text"
            onChange={e => setBoat({ ...boat, name: e.target.value })}
            value={boat.name || ""}
          />
        </label>
        <label htmlFor="captain">
          Captain
          <input
            id="captain"
            className="field"
            type="text"
            onChange={e => setBoat({ ...boat, captain: e.target.value })}
            value={boat.captain || ""}
          />
        </label>
        <input type="button" onClick={() => doSaveBoat(boat)} value="save" />
      </div>
    );
  }
);
