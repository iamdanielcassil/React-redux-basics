import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import "./manageRace.css";

export default connect(
  "selectRaces",
  "selectRouteParams",
  "selectCurrentRace",
  "doStartRace",
  "doEndRace",
  "doSetCurrent",
  ({
    races,
    routeParams,
    doStartRace,
    doEndRace,
    doSetCurrent,
    currentRace
  }) => {
    let timer = <Timer />;
    const [race, setRace] = useState();
    const [restarting, setRestarting] = useState(false);

    useEffect(() => {
      window.DC.debug.log("in use effect", race);
    }, [race]);
    useEffect(() => {
      doSetCurrent(routeParams.id);
    }, [routeParams.id, doSetCurrent, races]);

    useEffect(() => {
      setRace(currentRace);
    }, [currentRace]);

    if (!race) {
      return null;
    }

    return (
      <div className="page">
        <div className="manageRace-header">
          {race.startTime && !restarting ? (
            <input
              type="button"
              value="Prepare To Restart Race"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear the start time and all race results?"
                  )
                ) {
                  race.reset();
                  race.startTime = undefined;
                  window.DC.debug.log("after reset", race);
                  setRace(race);
                  // doStartRace(race.id, undefined);
                  setRestarting(true);
                }
              }}
            />
          ) : (
            <input
              type="button"
              value="Start Race"
              onClick={() => {
                let startTime = new Date();

                race.start(startTime);
                race.startTime = startTime;
                setRace(race);
                // doStartRace(race.id, time);
                setRestarting(false);
              }}
            />
          )}
        </div>
        <div className="manageRace-body">
          {race &&
            race.entries.map(entry => {
              let result = race.results
                ? race.results.find(r => r.id === entry.id)
                : [];

              if (!result) {
                return (
                  <RaceCell key={entry.id} entry={entry} race={race}>
                    {timer}
                  </RaceCell>
                );
              } else if (result) {
                return <RaceFinishedCell key={entry.id} result={result} />;
              }
            })}
        </div>
      </div>
    );
  }
);
function Timer() {
  const [time, setTime] = useState(new Date());

  window.setInterval(() => {
    let timeNow = new Date();
    setTime(timeNow);
  }, 100);

  if (time) {
    return (
      <div>{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`}</div>
    );
  } else {
    return null;
  }
}
function RaceCell({ entry, race, children }) {
  let startTime = race.startTime && new Date(race.startTime);

  return (
    <div key={entry.id} className="manageRace-race">
      <div className="manageRace-race-header">
        <div>{entry.name}</div>
        <span>
          {startTime
            ? `Start Time: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`
            : null}
        </span>
        {children}
      </div>
      {startTime ? (
        <input
          type="button"
          value="End Race"
          onClick={() => {
            race.finishEntry(entry.id, new Date());
            // doEndRace(race, entry, time);
          }}
        />
      ) : null}
    </div>
  );
}
function RaceFinishedCell({ result }) {
  let endTime = result.endTime && new Date(result.endTime);
  let startTime = result.startTime && new Date(result.startTime);

  if (!endTime || !startTime) {
    return "error";
  }

  return (
    <div className="manageRace-race">
      <div className="manageRace-race-header">
        <div>{result.name}</div>
      </div>
      <div className="manageRace-race-times">
        <span>{`Start Time: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`}</span>
        <span>{`End Time: ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}:${endTime.getMilliseconds()}`}</span>
      </div>
    </div>
  );
}
