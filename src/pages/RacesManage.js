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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { connect } from "redux-bundler-react";
import Race from "../models/Race";
import "./page.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  bold: {
    color: theme.palette.bold.main
  },
  listItem: {
    padding: 0
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "black"
  }
}));

let RaceItem = _race => {
  const classes = useStyles();
  let race = new Race(_race);
  let isFinished = !race.hasOpenEntries();

  console.log("race item", race, isFinished);
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText primary={race.name} secondary={race.startDate} />
          </ListItem>
        </List>
        {/* <Typography className={classes.heading}>{race.name}</Typography>
        <Typography className={classes.heading}>{race.startDate}</Typography> */}
      </ExpansionPanelSummary>
      <ExpansionPanelActions>
        <Button
          disabled={isFinished}
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => (window.location.hash = `#/races/manage/${race.id}`)}
        >
          Start
        </Button>
        <Button
          size="small"
          onClick={() => {
            if (
              !isFinished ||
              window.confirm(
                "This race is finished, are you sure you want to edit it?"
              )
            ) {
              window.location.hash = `#/races/${race.id}/edit`;
            }
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          className={classes.bold}
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete race: ${race.name}`
              )
            ) {
              race.delete();
              window.location.hash = "#/races/manage";
            }
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
  "doNewRace",
  "selectQueryObject",
  ({ races, doNewRace, queryObject }) => {
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
          <RaceItem key={race.id} {...race} />
        ))}
      </div>
    );
  }
);
