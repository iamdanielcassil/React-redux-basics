import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import "./manageRace.css";

export default connect(
  "selectRaces",
  "selectRouteParams",
  "doStartRace",
  "doEndRace",
  "selectRaceEvent",
  ({ races, routeParams, doStartRace, doEndRace, raceEvent }) => {
    const [race, setRace] = useState(races.find(r => r.id === routeParams.id));
    const [time, setTime] = useState(new Date());
    const [restarting, setRestarting] = useState(false);

    window.setInterval(() => {
      let timeNow = new Date();
      setTime(timeNow);
    }, 100);

    return (
      <div className="manageRace">
        <div className="manageRace-header">
          {raceEvent.startTime && !restarting ? (
            <input
              type="button"
              value="Prepare To Restart Race"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear the start time?"
                  )
                ) {
                  doStartRace(race.id, undefined);
                  setRestarting(true);
                }
              }}
            />
          ) : (
            <input
              type="button"
              value="Start Race"
              onClick={() => {
                doStartRace(race.id, time);
                setRestarting(false);
              }}
            />
          )}
        </div>
        <div className="manageRace-body">
          {race &&
            race.entries.map(entry => {
              let result = race.results.find(r => r.id === entry.id);

              if (!result) {
                return raceCell(entry, raceEvent, time, doEndRace, race);
              } else if (result) {
                return raceFinishedCell(result);
              }
            })}
        </div>
      </div>
    );
  }
);
function raceCell(entry, raceEvent, _time, doEndRace, race) {
  let time = new Date(_time);
  let startTime = raceEvent.startTime && new Date(raceEvent.startTime);

  return (
    <div className="manageRace-race">
      <div className="manageRace-race-header">
        <div>{entry.name}</div>
        {startTime ? (
          <div>
            Start Time:{" "}
            {`${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`}
          </div>
        ) : null}
        {time ? (
          <div>{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`}</div>
        ) : null}
      </div>
      <input
        type="button"
        value="End Race"
        onClick={() => {
          doEndRace(race, entry, time);
        }}
      />
    </div>
  );
}
function raceFinishedCell(result) {
  let endTime = result.endTime && new Date(result.endTime);
  let startTime = result.startTime && new Date(result.startTime);

  if (!endTime || !startTime) {
    return "error";
  }

  return (
    <div className="manageRace-race">
      <div className="manageRace-race-header">
        <div>{result.name}</div>
        {`Start Time: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`}
        {`End Time: ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}:${endTime.getMilliseconds()}`}
      </div>
    </div>
  );
}
