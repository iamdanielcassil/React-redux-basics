import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import "./boats.css";

export default connect(
  "selectRaces",
  "selectRouteParams",
  ({ races, routeParams }) => {
    const [race, setRace] = useState(races.find(r => r.id === routeParams.id));

    return (
      <div className="s">
        {race && race.entries.map(entry => <div>entry.name</div>)}
      </div>
    );
  }
);
