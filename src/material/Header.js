import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "redux-bundler-react";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

const tabSets = [
  {
    urlMatcher: "race",
    tabs: [
      {
        url: "#/races/stats",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Stats"
      },
      {
        url: "#/races/events",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Events"
      },
      {
        url: "#/races/manage",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Manage"
      }
    ]
  },
  {
    urlMatcher: "seasons",
    tabs: [
      {
        url: "#/seasons/stats",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Stats"
      },
      {
        url: "#/seasons/manage",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Manage"
      }
    ]
  },
  {
    urlMatcher: "boats",
    tabs: [
      {
        url: "#/boats/stats",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Stats"
      },
      {
        url: "#/boats/manage",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Manage"
      }
    ]
  },
  {
    urlMatcher: "/",
    tabs: [
      {
        url: "#/",
        action: function() {
          return (window.location.hash = this.url);
        },
        label: "Manage"
      }
    ]
  }
];

let TabBar = connect(
  "selectRouteInfo",
  ({ routeInfo }) => {
    const [tab, setTab] = useState(0);
    const [tabSetIndex, setTabSetIndex] = useState(0);

    useEffect(() => {
      let index = tabSets.findIndex(t => routeInfo.url.includes(t.urlMatcher));

      setTabSetIndex(index);
    }, [routeInfo, setTabSetIndex]);

    let tabSet = tabSets[tabSetIndex];

    console.log("route info", tabSetIndex, routeInfo, tabSet);

    if (!tabSet) {
      return;
    }

    let selectedTabIndex = tabSet.tabs.findIndex(t =>
      routeInfo.url.includes(t.url.replace("#", ""))
    );

    useEffect(() => {
      setTab(selectedTabIndex);
    }, [selectedTabIndex]);

    return (
      <Tabs
        value={tab}
        textColor="primary"
        onChange={(e, value) => {
          setTab(value);
          tabSet.tabs[value].action();
        }}
      >
        {" "}
        {tabSet.tabs.map(t => (
          <Tab key={t.label} textColor="inherit" label={t.label} />
        ))}
      </Tabs>
    );
  }
);

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar color="secondary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>

      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="secondary"
        position="static"
        elevation={0}
      >
        <TabBar />
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
