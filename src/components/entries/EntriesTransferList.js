import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { connect } from "redux-bundler-react";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    width: 200,
    minHeight: 230,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter(value => b.findIndex(x => x.name === value.name) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.findIndex(x => x.name === value.name) !== -1);
}

export default connect(
  "selectBoats",
  ({ boats, ...props }) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [right, setRight] = React.useState(
      props.race.entries.map(b => ({ name: b.name, captain: b.captain }))
    );
    const [left, setLeft] = React.useState(
      not(boats.map(b => ({ name: b.name, captain: b.captain })), right)
    );

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
      const currentIndex = checked.findIndex(c => c.name === value.name);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const handleAllRight = () => {
      setRight(right.concat(left));
      setLeft([]);
    };

    const handleCheckedRight = () => {
      leftChecked.forEach(checked => {
        let boat = boats.find(b => b.name === checked.name);
        if (boat) {
          props.race.addEntry(boat);
        }
      });
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      rightChecked.forEach(checked => {
        let boat = boats.find(b => b.name === checked.name);
        if (boat) {
          props.race.removeEntry(boat);
        }
      });
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
    };

    const customList = items => (
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map(({ name, captain }) => {
            const labelId = `transfer-list-item-${name}-label`;

            return (
              <ListItem
                key={name}
                role="listitem"
                button
                onClick={handleToggle({ name, captain })}
              >
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    checked={checked.findIndex(c => c.name === name) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={name} secondary={captain} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );

    return (
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
    );
  }
);
