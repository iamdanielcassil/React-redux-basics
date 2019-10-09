import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import Season from "../models/Season";
import "./viewrace.css";

export default connect(
  "doSelectCurrentSeason",
  "doSaveSeason",
  ({ doSaveSeason, doSelectCurrentSeason }) => {
    const [season, setSeason] = useState(
      doSelectCurrentSeason() || new Season({})
    );

    console.log("current season is:", season);
    return (
      <div>
        {season ? (
          <div className="form">
            <input
              className="field"
              type="text"
              onChange={e => setSeason({ ...season, name: e.target.value })}
              value={season.name || ""}
            />
            <input
              className="field"
              type="date"
              onChange={e =>
                setSeason({ ...season, startDate: e.target.value })
              }
              value={season.startDate}
            />
            <input
              type="button"
              onClick={() => doSaveSeason(season.update(season))}
              value="save"
            />
          </div>
        ) : null}
      </div>
    );
  }
);
