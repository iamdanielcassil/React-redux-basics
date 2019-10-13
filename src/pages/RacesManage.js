import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import "./page.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  bold: {
    backgroundColor: theme.palette.bold.main,
    color: theme.palette.bold.text
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "black"
  }
}));

let RaceItem = race => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <a href={`#/races/${race.id}`}>
          <Typography className={classes.heading}>{race.name}</Typography>
          <Typography className={classes.heading}>{race.startDate}</Typography>
        </a>
      </ExpansionPanelSummary>
      <ExpansionPanelActions>
        <Button
          size="small"
          onClick={() => (window.location.hash = `#/races/${race.id}/edit`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          className={classes.bold}
          onClick={() => {
            new Race(race).delete();
            window.location.hash = "#/races/manage";
          }}
        >
          DELETE
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};

export default connect(
  "selectRaces",
  "doGoToManageRace",
  "doNewRace",
  "selectQueryObject",
  ({ races, doGoToManageRace, doNewRace, queryObject }) => {
    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            <Button
              size="small"
              onClick={() => {
                doNewRace(queryObject.seasonId);
                window.location.hash = "#/races/new";
              }}
            >
              New Race
            </Button>
          </Toolbar>
        </AppBar>
        <div className="row" />

        {races.map(race => (
          <RaceItem {...race} />
        ))}
      </div>
    );
  }
);
