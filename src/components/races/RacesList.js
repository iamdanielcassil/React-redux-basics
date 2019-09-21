import React from "react";
import RacesListEntry from "./RacesListEntry";

export default ({ isLogedIn, races, doNewRace, currentSeason }) => {
  return (
    <div className="racelist">
      {isLogedIn ? (
        <div className="raceListEntry-addButton">
          <a
            title="view"
            href={`#/races/new`}
            className="racelist-new"
            onClick={() => doNewRace(currentSeason ? currentSeason.id : null)}
          >
            Add Race
          </a>
        </div>
      ) : null}
      {races.map(race => (
        <div key={race.id}>
          <RacesListEntry {...race} isLogedIn={isLogedIn} />
        </div>
      ))}
    </div>
  );
};
