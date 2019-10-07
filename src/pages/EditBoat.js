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
                placeholder="Boats name"
                type="text"
                onChange={e => setBoat({ ...boat, name: e.target.value })}
                value={boat.name || ""}
              />
            </label>
            <label htmlFor="captain">
              Captain
              <input
                id="captain"
                placeholder="Captain Jack"
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
                placeholder="Catalina"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, maker: e.target.value })}
                value={boat.maker || ""}
              />
            </label>
            <label htmlFor="type">
              Boat Type
              <input
                id="type"
                placeholder="fin keel, center board, cat"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, type: e.target.value })}
                value={boat.type || ""}
              />
            </label>
          </div>
          <div className="column">
            <label htmlFor="model">
              Model
              <input
                id="model"
                placeholder="25"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, model: e.target.value })}
                value={boat.model || ""}
              />
            </label>
            <label htmlFor="length">
              Length
              <input
                id="length"
                placeholder="25"
                className="field"
                type="text"
                onChange={e => setBoat({ ...boat, length: e.target.value })}
                value={boat.length || ""}
              />
            </label>
            <label htmlFor="phrf">
              PHRF
              <input
                id="phrf"
                className="field"
                placeholder="perscribed handicap number"
                type="text"
                onChange={e => setBoat({ ...boat, phrf: e.target.value })}
                value={boat.phrf || ""}
              />
            </label>
            <label htmlFor="crew">
              Crew
              <input
                id="crew"
                className="field"
                placeholder="comma seporated list of names"
                type="text"
                onChange={e => setBoat({ ...boat, crew: e.target.value })}
                value={boat.crew || ""}
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
