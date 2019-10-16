import React, { useState, useEffect } from "react";
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
    minWidth: "100px",
    alignSelf: "center",
    height: "25px"
  }
}));

export default connect(
  "doSelectStats",
  "selectHash",
  "selectRaces",
  "selectCurrentSeason",
  "selectSeasons",
  "doGoToSelectSeason",
  ({
    doSelectStats,
    hash,
    races,
    currentSeason,
    seasons,
    doGoToSelectSeason
  }) => {
    const [stats, setStats] = useState([]);
    const [current, setCurrent] = useState();
    const classes = useStyles();

    useEffect(() => {
      setStats(doSelectStats(hash));
    }, [hash, races, doSelectStats]);

    useEffect(() => {
      setCurrent(stats && stats[0]);
    }, [stats]);

    console.log("in stats", stats);

    return (
      <div className="page">
        <AppBar position="static">
          <Toolbar>
            <Select
              id="seasons"
              color="secondary"
              className={classes.field}
              handleChange={e => doGoToSelectSeason(e.target.value)}
              value={currentSeason ? currentSeason.id : ""}
              options={seasons.map(s => ({ key: s.id, value: s.name }))}
            />
            {current ? (
              <Select
                color="secondary"
                id="windDirection"
                className={classes.field}
                handleChange={e =>
                  setCurrent(stats.find(r => r.name === e.target.value))
                }
                value={current.name || ""}
                options={stats.map(result => ({ value: result.name }))}
              />
            ) : null}
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
            {current &&
              current.results &&
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
