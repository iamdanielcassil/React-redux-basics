import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";

export default connect(
  "doSaveBoat",
  "doDeleteBoat",
  "selectCurrentBoat",
  ({ doSaveBoat, doDeleteBoat, currentBoat }) => {
    const [boat, setBoat] = useState(currentBoat || {});
    const [isEditing, setIsEditing] = useState(false);

    return (
      <div className="form">
        <div className="row">
          {!isEditing ? (
            <input
              className="button-secondary"
              type="button"
              onClick={() => setIsEditing(true)}
              value="edit"
            />
          ) : null}
          {isEditing && boat.id ? (
            <input
              className="button-secondary button-delete"
              type="button"
              onClick={() => doDeleteBoat(boat)}
              value="DELETE"
            />
          ) : null}
        </div>
        <div className="row">
          <div className="column">
            <label htmlFor="name">
              Name
              <input
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
            {isEditing ? (
              <input
                className="button-save"
                type="button"
                onClick={() => doSaveBoat(boat)}
                value="save"
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
