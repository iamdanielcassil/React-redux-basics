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
import "./editRace.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    padding: 0,
    marginTop: "15px"
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    borderRadius: 0,
    margin: "15px"
  },
  cancelButton: {
    width: "100%",
    padding: "10px",
    borderRadius: 0,
    margin: "15px"
  },
  formGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  field: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    maxWidth: "400px",
    flex: "1 0",
    minWidth: "300px",
    alignSelf: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

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
    const [race, setRace] = useState();

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
      <form className={classes.root} autoComplete="off">
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.formGroup}>
            <Text
              className={classes.field}
              id="name"
              label="Name"
              required
              handleChange={e => setRace({ ...race, name: e.target.value })}
              value={race.name || ""}
            />
            <DateTime
              className={classes.field}
              id="name"
              label="Name"
              required
              handleChange={date => setRace({ ...race, startDate: date })}
              value={getDateTime(race.startDate)}
            />
            <Text
              className={classes.field}
              id="windSpeed"
              label="Wind Speed"
              handleChange={e =>
                setRace({ ...race, windSpeed: e.target.value })
              }
              value={race.windSpeed || ""}
            />
            <Select
              id="windDirection"
              label="Wind Direction"
              className={classes.field}
              handleChange={e =>
                setRace({ ...race, windDirection: e.target.value })
              }
              value={race.windDirection || ""}
              options={[
                { value: "N" },
                { value: "NE" },
                { value: "E" },
                { value: "SE" },
                { value: "S" },
                { value: "SW" },
                { value: "W" },
                { value: "NW" }
              ]}
            />
            <Text
              className={classes.field}
              id="temperature"
              label="Temperature"
              handleChange={e =>
                setRace({ ...race, temperature: e.target.value })
              }
              value={race.temperature || ""}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Race Entries</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RaceEntries race={currentRace} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Container className={classes.container}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.cancelButton}
            onClick={() => doGoToManageRaces()}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={() =>
              doSaveRace(currentRace.update(race)).then(() =>
                doGoToManageRaces()
              )
            }
          >
            Save
          </Button>
        </Container>
      </form>
    );
  }
);

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
