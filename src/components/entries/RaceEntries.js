import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import Container from "@material-ui/core/Container";
import AutoSelectList from "../AutoSelectList";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  action: {
    position: "absolute",
    top: "16px",
    right: "-20px"
  },
  tinyIcon: {
    fontSize: "14pt"
  },
  container: {
    position: "relative",
    flex: "1 1",
    marginRight: "15px"
  }
}));

export default connect(
  "selectBoats",
  ({ boats, ...props }) => {
    const classes = useStyles();
    const [selecedSuggestion, setSelectedSuggestion] = useState();
    const [sugegstions, setSuggestions] = useState(
      getFilteredBoats(boats, props.race)
    );
    useEffect(() => {}, [selecedSuggestion]);

    window.DC.debug.log("props", props);
    return (
      <React.Fragment>
        <Container className={classes.container}>
          <AutoSelectList
            inputProps={{ label: "Race Entries" }}
            value={selecedSuggestion}
            suggestions={sugegstions}
            onSuggestionSelected={suggestion => {
              setSelectedSuggestion(suggestion.suggestionValue);
            }}
          />
          {selecedSuggestion ? (
            <IconButton
              className={classes.action}
              aria-label="Add"
              onClick={() => {
                let boat = boats.find(b => b.name === selecedSuggestion);

                if (boat) {
                  props.race.addEntry(boat);
                  setSelectedSuggestion(undefined);
                  setSuggestions(getFilteredBoats(boats, props.race));
                }
              }}
            >
              <PostAddIcon className={classes.tinyIcon} />
            </IconButton>
          ) : null}
        </Container>

        <List>
          {props.race.entries.map(entry => (
            <ListItem key={entry.key} dense>
              <ListItemText secondary={entry.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    props.race.removeEntry(entry);
                    setSuggestions(getFilteredBoats(boats, props.race));
                    setSelectedSuggestion(undefined);
                  }}
                >
                  <DeleteIcon className={classes.tinyIcon} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
);
function getFilteredBoats(boats, race) {
  return boats
    .filter(b => !race.entries.some(e => e.name === b.name))
    .map(b => ({ label: b.name }));
}
