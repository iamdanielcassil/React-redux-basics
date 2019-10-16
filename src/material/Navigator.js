import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import Chip from "@material-ui/core/Chip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DirectionsBoatOutlinedIcon from "@material-ui/icons/DirectionsBoatOutlined";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import WavesOutlinedIcon from "@material-ui/icons/WavesOutlined";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "redux-bundler-react";

const categories = isAuthed => [
  {
    id: "Develop",
    children: [
      {
        id: "Races",
        icon: <EmojiEventsOutlinedIcon />,
        url: "#/races/stats"
      },
      {
        id: "Seasons",
        icon: <WavesOutlinedIcon />,
        url: "#/seasons/manage"
        // disabled: true
      },
      {
        id: "Boats",
        icon: <DirectionsBoatOutlinedIcon />,
        url: "#/boats/manage"
      }
    ]
  },
  {
    id: "",
    children: [
      {
        id: "Login",
        icon: <PeopleIcon />,
        hidden: isAuthed,
        url: "#/login"
      },
      {
        id: "Log Off",
        icon: <ExitToAppIcon />,
        url: "#/login",
        hidden: !isAuthed
      }
    ]
  }
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)"
    }
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: "#4fc3f7"
  },
  itemPrimary: {
    fontSize: "inherit"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  }
});

const Navigator = connect(
  "selectIsAuthed",
  "selectUser",
  ({ isAuthed, user, classes, ...other }) => {
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            OCBC
          </ListItem>
          <ListItem className={clsx(classes.item, classes.itemCategory)}>
            <ListItemIcon className={classes.itemIcon}>
              {isAuthed ? (
                <Avatar alt="Natacha">{user.displayName[0]}</Avatar>
              ) : (
                <HomeIcon />
              )}
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary
              }}
            >
              {isAuthed ? user.displayName : "Regatta"}
            </ListItemText>
          </ListItem>
          {categories(isAuthed).map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(
                ({ id: childId, icon, hidden, disabled, url, onClick }) => {
                  if (hidden) {
                    return null;
                  }
                  return (
                    <ListItem
                      disabled={disabled}
                      key={childId}
                      onClick={() => {
                        window.location.hash = url;
                        other.onClose();
                      }}
                      button
                      className={clsx(
                        classes.item,
                        window.location.hash.includes(url) &&
                          classes.itemActiveItem
                      )}
                    >
                      <ListItemIcon className={classes.itemIcon}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        classes={{
                          primary: classes.itemPrimary
                        }}
                      >
                        {childId}
                      </ListItemText>
                    </ListItem>
                  );
                }
              )}

              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
);

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
