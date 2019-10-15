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
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { connect } from "redux-bundler-react";
import Boat from "../models/Boat";
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
    fontSize: theme.typography.pxToRem(12),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    color: theme.palette.text.secondary
  }
}));

// captain: "David Cheek"
// crew: "DanielCassil"
// id: "1570243371510"
// length: "22"
// maker: "J Boats"
// model: "J22"
// name: "Grate Expectations 99"
// phrf: "100"
// type: "Fin Keel"
// year: ""
let GridItem = ({ classes, label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography className={classes.heading}>{label}</Typography>
    <Typography className={classes.secondaryHeading}>
      {value || "unknown"}
    </Typography>
  </Grid>
);

let BoatItem = _boat => {
  const classes = useStyles();
  let boat = new Boat(_boat);

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
    </ExpansionPanel>
  );
};

export default connect(
  "selectBoats",
  "doNewRace",
  "selectQueryObject",
  ({ boats, doNewRace, queryObject }) => {
    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            <Button
              size="small"
              onClick={() => {
                window.location.hash = "#/boats/new";
              }}
            >
              New Boat
            </Button>
          </Toolbar>
        </AppBar>

        {boats.map(boat => (
          <BoatItem key={boat.id} {...boat} />
        ))}
      </div>
    );
  }
);

// export default connect(
//   "selectBoats",
//   "doGoToSelectBoat",
//   ({ boats, doGoToSelectBoat }) => {
//     return (
//       <div className="boats">
//         <div className="row">
//           <div className="double-column">
//             <a className="button-secondary" href="#/boats/new">
//               New Boat
//             </a>
//           </div>
//         </div>
//         <ul className="list">
//           {boats.map(boat => (
//             <li
//               key={boat.id}
//               className="list-item editable"
//               onClick={() => doGoToSelectBoat(boat.id)}
//             >
//               <span className="list-column">
//                 <span>{boat.name}</span>
//                 <span className="secondary">Captain: {boat.captain}</span>
//               </span>
//               <span className="list-column">
//                 <span>{boat.maker}</span>
//                 <span className="secondary">{boat.type}</span>
//               </span>
//               <span className="list-column">
//                 <More>
//                   <span>a</span>
//                   <span>a</span>
//                 </More>
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// );
