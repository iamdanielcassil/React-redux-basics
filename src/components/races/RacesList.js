import React from "react";
import RacesListEntry from "./RacesListEntry";

export default props => {
  return (
    <div className="racelist">
      {props.races.map(race => (
        <div key={race.id}>
          <RacesListEntry {...race} isLogedIn={props.isLogedIn} />
        </div>
      ))}
    </div>
  );
};
