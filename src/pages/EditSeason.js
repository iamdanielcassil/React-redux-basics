import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Season from "../models/Season";
import "./viewrace.css";

export default connect(
  "selectRouteParams",
  "selectCurrentSeason",
  "doSetCurrentSeason",
  "doSaveSeason",
  "selectSeasons",
  "selectRouteInfo",
  ({
    routeParams,
    currentSeason,
    doSetCurrentSeason,
    doSaveSeason,
    seasons,
    routeInfo
  }) => {
    const [season, setSeason] = useState(currentSeason || new Season({}));

    console.log("called edit season with pathname:", routeInfo);
    useEffect(() => {
      if (seasons && seasons.length > 0 && routeParams.id) {
        let season = seasons.find(r => r.id === routeParams.id);
        console.log("in use effect, seasons and season are", seasons, season);

        if (season) {
          doSetCurrentSeason(season);
        }
      }
    }, [routeParams, doSetCurrentSeason, seasons]);

    useEffect(() => {
      if (routeInfo.url === "/seasons/new") {
        let newSeason = new Season({});
        setSeason(newSeason);
        doSetCurrentSeason(newSeason);
      }
    }, [routeInfo, doSetCurrentSeason]);

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
