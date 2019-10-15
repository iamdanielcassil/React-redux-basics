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
  fullField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    maxWidth: "80%",
    flex: "1 1 auto",
    minWidth: "300px",
    alignSelf: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default connect(
  "selectRouteParams",
  "selectCurrentSeason",
  "doSaveSeason",
  "doSetCurrent",
  "selectSeasons",
  "doGoToManageRaces",
  ({
    routeParams,
    currentSeason,
    doSaveSeason,
    doSetCurrent,
    seasons,
    doGoToManageRaces
  }) => {
    const classes = useStyles();
    const [season, setSeason] = useState();

    useEffect(() => {
      doSetCurrent(routeParams.id);
    }, [routeParams.id, doSetCurrent, seasons]);

    useEffect(() => {
      setSeason(currentSeason);
    }, [currentSeason]);

    if (!season) {
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
            <DateTime
              className={classes.fullField}
              dateField
              id="sdate"
              label="Start Date"
              required
              handleChange={date => setSeason({ ...season, startDate: date })}
              value={getDateTime(season.startDate)}
            />
            <DateTime
              className={classes.fullField}
              dateField
              id="edate"
              label="End Date"
              required
              handleChange={date => setSeason({ ...season, endDate: date })}
              value={getDateTime(season.endDate)}
            />
            <Text
              className={classes.field}
              id="name"
              label="Name"
              required
              handleChange={e => setSeason({ ...season, name: e.target.value })}
              value={season.name || ""}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Container className={classes.container}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.cancelButton}
            onClick={() => (window.location.hash = "/seasons/manage")}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={() =>
              doSaveSeason(currentSeason.update(season)).then(
                () => (window.location.hash = "/seasons/manage")
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
