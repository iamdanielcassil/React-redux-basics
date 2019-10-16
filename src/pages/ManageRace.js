import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import { makeStyles } from "@material-ui/core/styles";
import RaceEntries from "../components/entries/RaceEntries";
import Button from "@material-ui/core/Button";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Text from "../components/form/inputs/Text";
import DateTime from "../components/form/inputs/DateTime";
import Select from "../components/form/inputs/Select";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TimerIcon from "@material-ui/icons/Timer";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Chip from "@material-ui/core/Chip";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grid from "@material-ui/core/Grid";
import "./editRace.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    margin: "0 15px",
    "justify-self": "flex-start",
    flex: "1 1 auto"
  },
  container: {
    display: "flex",
    padding: 0,
    marginTop: "15px"
  },
  summaryIcon: {
    marginLeft: "25px"
  }
}));

let Timmer = ({ live, color, label, time }) => {
  const [_time, setTime] = useState(time || new Date());

  useEffect(() => {
    if (live) {
      const timer = window.setInterval(() => {
        setTime(new Date());
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [live]);

  return (
    <TimeChip
      color={color}
      label={label}
      time={`${_time.toLocaleTimeString()} : ${
        _time.getMilliseconds().toString()[0]
      }`}
    />
  );
};

let TimeChip = ({ time, color, label }) => {
  return (
    <Chip
      color={color}
      icon={<TimerIcon />}
      label={`${label}: ${time}`}
      variant="outlined"
    />
  );
};

export default connect(
  "selectRouteParams",
  "selectCurrentRace",
  "doSaveRace",
  "doSetCurrent",
  "selectRaces",
  "doGoToManageRaces",
  ({
    routeParams,
    currentRace,
    doSaveRace,
    doSetCurrent,
    races,
    doGoToManageRaces
  }) => {
    const classes = useStyles();
    let [race, setRace] = useState();

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
        <AppBar position="static">
          <Toolbar>
            <EmojiEventsIcon />
            <Typography variant="h6" className={classes.title}>
              {race.name}
            </Typography>
            {race.hasStarted() ? (
              <Button
                size="small"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear the start time and all race results?"
                    )
                  ) {
                    window.DC.debug.log("after reset", race);
                    setRace(race.reset());
                  }
                }}
              >
                Rest Race
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => {
                  let startTime = new Date();

                  setRace(race.start(startTime));
                }}
              >
                Start Race
              </Button>
            )}
            {race.hasEnded() ? null : (
              <Timmer color="secondary" live label="" />
            )}
          </Toolbar>

          {race.hasStarted() ? (
            <Toolbar>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Timmer
                    color="secondary"
                    label="start"
                    time={race.startTime}
                  />
                </Grid>

                {race.hasEnded() ? (
                  <Grid item xs={12} sm={6}>
                    <Timmer color="secondary" label="end" time={race.endTime} />
                  </Grid>
                ) : null}
              </Grid>
              {race.isRunning() ? (
                <Grid item xs={12} sm={6}>
                  <Button
                    size="small"
                    onClick={() => {
                      let endTime = new Date();

                      setRace(race.end(endTime));
                    }}
                  >
                    End Race
                  </Button>
                </Grid>
              ) : null}
            </Toolbar>
          ) : null}
        </AppBar>
        {race.entries &&
          race.entries.map(entry => {
            let result = race.results
              ? race.results.find(r => r.id === entry.id)
              : [];

            if (!result && !race.endTime) {
              return (
                <RaceCell
                  key={entry.id}
                  {...{ classes, entry, setRace, race }}
                />
              );
            } else {
              return (
                <RaceFinishedCell
                  classes={classes}
                  key={entry.id}
                  result={
                    result || {
                      ...entry,
                      endTime: race.endTime,
                      startTime: race.startTime
                    }
                  }
                />
              );
            }
          })}
      </div>
    );
  }
);

function RaceCell({ classes, entry, setRace, race }) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={race.startTime ? <ExpandMoreIcon /> : null}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{entry.name}</Typography>
      </ExpansionPanelSummary>
      {race.startTime ? (
        <ExpansionPanelDetails className={classes.formGroup}>
          <Button
            size="large"
            onClick={() => {
              let endTime = new Date().getTime();
              setRace(race.finishEntry(entry.id, endTime));
            }}
          >
            Finish Boat
          </Button>
        </ExpansionPanelDetails>
      ) : null}
    </ExpansionPanel>
  );
}

function RaceFinishedCell({ classes, result }) {
  let endTime = result.endTime && new Date(result.endTime);
  let startTime = result.startTime && new Date(result.startTime);

  if (!endTime || !startTime) {
    return "error";
  }

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{result.name}</Typography>
        <CheckCircleOutlineIcon className={classes.summaryIcon} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.formGroup}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Timmer label="start time" time={startTime} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Timmer label="end time" time={endTime} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function getDateTime(d) {
  let date;

  if (d) {
    date = new Date(d);
  } else {
    date = new Date();
  }

  let dateString = date.toISOString();
  let returnString = dateString.substring(0, 19);
  return returnString;
}

// export default connect(
//   "selectRaces",
//   "selectRouteParams",
//   "selectCurrentRace",
//   "doStartRace",
//   "doEndRace",
//   "doSetCurrent",
//   ({
//     races,
//     routeParams,
//     doStartRace,
//     doEndRace,
//     doSetCurrent,
//     currentRace
//   }) => {
//     let timer = <Timer />;
//     const [race, setRace] = useState();
//     const [restarting, setRestarting] = useState(false);

//     useEffect(() => {
//       window.DC.debug.log("in use effect", race);
//     }, [race]);
//     useEffect(() => {
//       doSetCurrent(routeParams.id);
//     }, [routeParams.id, doSetCurrent, races]);

//     useEffect(() => {
//       setRace(currentRace);
//     }, [currentRace]);

//     if (!race) {
//       return null;
//     }

//     return (
//       <div className="page">
//         <div className="manageRace-header">
//           {race.startTime && !restarting ? (
//             <input
//               type="button"
//               value="Prepare To Restart Race"
//               onClick={() => {
//                 if (
//                   window.confirm(
//                     "Are you sure you want to clear the start time and all race results?"
//                   )
//                 ) {
//                   race.reset();
//                   race.startTime = undefined;
//                   window.DC.debug.log("after reset", race);
//                   setRace(race);
//                   // doStartRace(race.id, undefined);
//                   setRestarting(true);
//                 }
//               }}
//             />
//           ) : (
//             <input
//               type="button"
//               value="Start Race"
//               onClick={() => {
//                 let startTime = new Date();

//                 race.start(startTime);
//                 race.startTime = startTime;
//                 setRace(race);
//                 // doStartRace(race.id, time);
//                 setRestarting(false);
//               }}
//             />
//           )}
//         </div>
//         <div className="manageRace-body">
//           {race &&
//             race.entries.map(entry => {
//               let result = race.results
//                 ? race.results.find(r => r.id === entry.id)
//                 : [];

//               if (!result) {
//                 return (
//                   <RaceCell key={entry.id} entry={entry} race={race}>
//                     {timer}
//                   </RaceCell>
//                 );
//               } else if (result) {
//                 return <RaceFinishedCell key={entry.id} result={result} />;
//               }
//             })}
//         </div>
//       </div>
//     );
//   }
// );
// function Timer() {
//   const [time, setTime] = useState(new Date());

//   window.setInterval(() => {
//     let timeNow = new Date();
//     setTime(timeNow);
//   }, 100);

//   if (time) {
//     return (
//       <div>{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}`}</div>
//     );
//   } else {
//     return null;
//   }
// }
// function RaceCell({ entry, race, children }) {
//   let startTime = race.startTime && new Date(race.startTime);

//   return (
//     <div key={entry.id} className="manageRace-race">
//       <div className="manageRace-race-header">
//         <div>{entry.name}</div>
//         <span>
//           {startTime
//             ? `Start Time: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`
//             : null}
//         </span>
//         {children}
//       </div>
//       {startTime ? (
//         <input
//           type="button"
//           value="End Race"
//           onClick={() => {
//             race.finishEntry(entry.id, new Date());
//             // doEndRace(race, entry, time);
//           }}
//         />
//       ) : null}
//     </div>
//   );
// }
// function RaceFinishedCell({ result }) {
//   let endTime = result.endTime && new Date(result.endTime);
//   let startTime = result.startTime && new Date(result.startTime);

//   if (!endTime || !startTime) {
//     return "error";
//   }

//   return (
//     <div className="manageRace-race">
//       <div className="manageRace-race-header">
//         <div>{result.name}</div>
//       </div>
//       <div className="manageRace-race-times">
//         <span>{`Start Time: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`}</span>
//         <span>{`End Time: ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}:${endTime.getMilliseconds()}`}</span>
//       </div>
//     </div>
//   );
// }
