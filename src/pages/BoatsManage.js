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
import Boat from "../models/Boat";

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
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary
  }
}));

let GridItem = ({ classes, label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography className={classes.heading}>{label}</Typography>
    <Typography className={classes.secondaryHeading}>
      {value || "unknown"}
    </Typography>
  </Grid>
);

let BoatItem = ({ isAuthed, ...props }) => {
  const classes = useStyles();
  let boat = new Boat(props.boat);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText primary={boat.name} secondary={boat.captain} />
          </ListItem>
        </List>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={1}>
          <GridItem classes={classes} label="Year" value={boat.year} />
          <GridItem classes={classes} label="Maker" value={boat.maker} />
          <GridItem classes={classes} label="Model" value={boat.model} />
          <GridItem classes={classes} label="Length" value={boat.length} />
          <GridItem classes={classes} label="type" value={boat.type} />
          <GridItem classes={classes} label="PHRF" value={boat.phrf} />
        </Grid>
      </ExpansionPanelDetails>
      {isAuthed ? (
        <ExpansionPanelActions>
          <Button
            size="small"
            onClick={() => {
              window.location.hash = `#/boats/${boat.id}/edit`;
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
                  `Are you sure you want to delete race: ${boat.name}`
                )
              ) {
                boat.delete();
                window.location.hash = "#/boats/manage";
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
  "selectBoats",
  "doSetCurrentBoat",
  ({ isAuthed, boats, doSetCurrentBoat }) => {
    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            {isAuthed ? (
              <Button
                size="small"
                onClick={() => {
                  doSetCurrentBoat();
                  window.location.hash = "#/boats/new";
                }}
              >
                New Boat
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>

        {boats.map(boat => (
          <BoatItem key={boat.id} boat={boat} isAuthed={isAuthed} />
        ))}
      </div>
    );
  }
);
