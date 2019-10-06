import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";

export default connect(
  "doSaveBoat",
  "selectCurrentBoat",
  ({ doSaveBoat, currentBoat }) => {
    const [boat, setBoat] = useState(currentBoat || {});

    return (
      <div className="form">
        <div className="row">
          <div className="column">
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
            <label htmlFor="maker">
              Boat Maker
              <input
                id="maker"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, maker: e.target.value })}
                value={boat.captain || ""}
              />
            </label>
          </div>
          <div className="column">
            <label htmlFor="model">
              Model
              <input
                id="model"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, model: e.target.value })}
                value={boat.captain || ""}
              />
            </label>
            <label htmlFor="length">
              Length
              <input
                id="length"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, length: e.target.value })}
                value={boat.captain || ""}
              />
            </label>
            <label htmlFor="phrf">
              PHRF
              <input
                id="phrf"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, phrf: e.target.value })}
                value={boat.captain || ""}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="double-column">
            <input
              type="button"
              onClick={() => doSaveBoat(boat)}
              value="save"
            />
          </div>
        </div>
      </div>
    );
  }
);
