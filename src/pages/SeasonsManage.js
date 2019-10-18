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
import Grid from "@material-ui/core/Grid";

import { connect } from "redux-bundler-react";
import Season from "../models/Season";

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
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
    color: "black"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary
  }
}));

let GridItem = ({ classes, label, value, icon }) => (
  <Grid item xs={12} sm={6}>
    <Typography className={classes.heading}>{label}</Typography>
    <Typography className={classes.secondaryHeading}>
      {value || "unknown"}
    </Typography>
  </Grid>
);

let Item = ({ classes, isAuthed, ...props }) => {
  let season = new Season(props.season);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText primary={season.name} />
          </ListItem>
        </List>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={1}>
          <GridItem
            classes={classes}
            label="Start Date"
            value={new Date(season.startDate).toLocaleTimeString()}
          />
          <GridItem
            classes={classes}
            label="End Date"
            value={new Date(season.endDate).toLocaleTimeString()}
          />
        </Grid>
      </ExpansionPanelDetails>
      {isAuthed ? (
        <ExpansionPanelActions>
          <Button
            size="small"
            onClick={() => {
              window.location.hash = `#/seasons/${season.id}/edit`;
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
                  `Are you sure you want to delete race: ${season.name}`
                )
              ) {
                season.delete();
                window.location.hash = "#/seasons/manage";
              }
            }}
          >
            DELETE
          </Button>
        </ExpansionPanelActions>
      ) : null}
    </ExpansionPanel>
  );
};

export default connect(
  "selectIsAuthed",
  "selectSeasons",
  "doNewSeason",
  ({
    isAuthed,
    seasons,
    doNewSeason,
  }) => {
    const classes = useStyles();

    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            {isAuthed ? (
              <Button
                size="small"
                onClick={() => {
                  doNewSeason();
                  window.location.hash = "#/seasons/new";
                }}
              >
                New Season
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        <div className="row" />

        {seasons.map(season => (
          <Item
            classes={classes}
            key={season.id}
            season={season}
            isAuthed={isAuthed}
          />
        ))}
      </div>
    );
  }
);
