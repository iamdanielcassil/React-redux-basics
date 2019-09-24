import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import Modal from "../Modal";
import "./raceEntries.css";

export default connect(
  "selectRaceEntries",
  ({ raceEntries }) => {
    const [adding, setAdding] = useState(false);

    if (adding) {
      return (
        <Modal>
          <button className="" onClick={() => setAdding(false)}>
            Close
          </button>
        </Modal>
      );
    }
    return (
      <div className="raceEntries">
        <button
          value="Add"
          onClick={e => {
            setAdding(true);
          }}
        >
          Add
        </button>
      </div>
    );
  }
);
