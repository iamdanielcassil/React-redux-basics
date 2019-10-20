import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Text from "../components/form/inputs/Text";
import AutoSelectList from "../components/AutoSelectList";

import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DirectionsBoatOutlinedIcon from "@material-ui/icons/DirectionsBoatOutlined";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import WavesOutlinedIcon from "@material-ui/icons/WavesOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "redux-bundler-react";

const drawerWidth = 256;

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
  clubSearch: {
    container: {
      color: "white"
    },
    input: {
      color: "white"
    }
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
  itemPrimaryClickable: {
    fontSize: "inherit",
    cursor: "pointer"
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  inputLabel: {
    color: "white",
    borderColor: "white"
  },
  inputFieldset: {}
});

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white"
    },
    "& label": {
      color: "white"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white"
      },
      "&:hover fieldset": {
        borderColor: "white"
      },
      "&.Mui-focused fieldset": {
        borderColor: "white"
      },
      color: "white"
    }
  }
})(Text);

const Navigator = connect(
  "selectIsAuthed",
  "selectUser",
  "selectUserClub",
  ({ isAuthed, user, userClub, classes, ...other }) => {
    const [userSettingsToggle, setUserSettingsToggle] = useState(false);

    return (
      <React.Fragment>
        {UserSettingsDrawer(
          userSettingsToggle,
          setUserSettingsToggle,
          classes,
          userClub,
          other.mobileOpen
        )}
        {MainDrawer(other, classes, setUserSettingsToggle, isAuthed, user)}
      </React.Fragment>
    );
  }
);

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

function UserSettingsDrawer(
  userSettingsToggle,
  setUserSettingsToggle,
  classes,
  userClub,
  mainOpen
) {
  const [openClubSearch, setOpenClubSearch] = useState();

  useEffect(() => {}, [mainOpen]);

  return (
    <Drawer
      PaperProps={{ style: { width: drawerWidth } }}
      variant="temporary"
      open={!mainOpen && userSettingsToggle}
      onClose={() => setUserSettingsToggle(false)}
    >
      {" "}
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
          onClick={() => setUserSettingsToggle(false)}
        >
          <IconButton color="primary">
            <ArrowBackIosIcon />
            Back
          </IconButton>
        </ListItem>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          User Settings
        </ListItem>
        <ListItem className={classes.categoryHeader}>
          <ListItemText
            classes={{
              primary: classes.categoryHeaderPrimary
            }}
          >
            Club Key
          </ListItemText>
        </ListItem>
        {openClubSearch ? (
          <ClubSearchPanel
            classes={classes}
            done={() => {
              setOpenClubSearch(false);
            }}
          />
        ) : (
          <ListItem className={classes.item}>
            <ListItemIcon className={classes.itemIcon}>
              <GroupIcon color="secondary" />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary
              }}
            >
              {userClub}
            </ListItemText>
            <ListItemText
              onClick={() => setOpenClubSearch(true)}
              classes={{
                primary: classes.itemPrimaryClickable
              }}
            >
              change
            </ListItemText>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
let ClubSearchPanel = connect(
  "selectClubs",
  "doUpdateClub",
  ({ clubs, doUpdateClub, classes, done }) => {
    const [selectedClub, setSelectedClub] = useState();

    return (
      <ListItem
        className={clsx(classes.firebase, classes.item, classes.itemCategory)}
      >
        <AutoSelectList
          inputProps={{
            primary: classes.itemPrimary
          }}
          theme={classes.clubSearch}
          suggestions={clubs}
          value={selectedClub ? selectedClub : ""}
          onSuggestionSelected={setSelectedClub}
        />
        {selectedClub ? (
          <ListItemText
            onClick={() => {
              doUpdateClub(selectedClub.suggestion.key).then(done);
            }}
            classes={{
              primary: classes.itemPrimaryClickable
            }}
          >
            update
          </ListItemText>
        ) : null}
      </ListItem>
    );
  }
);

function MainDrawer(other, classes, setUserSettingsToggle, isAuthed, user) {
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          OCBC
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <IconButton
              onClick={() => {
                other.onClose();
                setUserSettingsToggle(true);
              }}
            >
              {isAuthed ? (
                <Avatar alt="Natacha">{user.displayName[0]}</Avatar>
              ) : (
                <HomeIcon />
              )}
            </IconButton>
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

export default withStyles(styles)(Navigator);
