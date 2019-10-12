import React, { useState } from "react";
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

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const [tab, setTab] = useState(0);
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
        <Tabs
          value={tab}
          textColor="primary"
          onChange={(e, value) => {
            setTab(value);
            switch (value) {
              case 0:
                window.location.hash = "#/";
                break;
              case 1:
                window.location.hash = "#/races/manage";
                break;
              case 2:
                window.location.hash = "#/seasons/view";
                break;
              case 3:
                window.location.hash = "#/boats";
                break;
              default:
                break;
            }
          }}
        >
          <Tab textColor="inherit" label="Stats" />
          <Tab textColor="inherit" label="Open Races" />
          <Tab textColor="inherit" label="Manage Seasons" />
          <Tab textColor="inherit" label="Manage Boats" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
