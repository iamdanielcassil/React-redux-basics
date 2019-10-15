import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import StatsSeason from "../components/stats/StatsSeason";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Select from "../components/form/inputs/Select";
import { connect } from "redux-bundler-react";

import "./stats.css";
import "../components/stats/stats.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  bold: {
    color: theme.palette.bold.main
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "black"
  },
  field: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    maxWidth: "400px",
    flex: "1 0",
    minWidth: "300px",
    alignSelf: "center"
  }
}));

export default connect(
  "selectResults",
  ({ results }) => {
    const [current, setCurrent] = useState(results && results[0]);
    const classes = useStyles();
    console.log("in stats", results);
    if (!current) {
      return null;
    }
    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            {/* <EmojiEventsIcon /> */}
            <Select
              color="secondary"
              id="windDirection"
              className={classes.field}
              handleChange={e =>
                setCurrent(results.find(r => r.name === e.target.value))
              }
              value={current.name || ""}
              options={results.map(result => ({ value: result.name }))}
            />
          </Toolbar>
        </AppBar>

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Boat Name</TableCell>
              <TableCell align="right">Captain</TableCell>
              <TableCell align="right">End Time</TableCell>
              <TableCell align="right">Total Time</TableCell>
              <TableCell align="right">PHRF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {current.results &&
              current.results.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.captain}</TableCell>
                  <TableCell align="right">
                    {new Date(row.endTime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.endTime - row.startTime}
                  </TableCell>
                  <TableCell align="right">{row.phrf}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);
