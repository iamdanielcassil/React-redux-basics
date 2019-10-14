import React from "react";
import PropTypes from "prop-types";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import { connect } from "redux-bundler-react";
import Header from "./Header";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#5284af",
      dark: "#006db3"
    },
    alternate: {
      text: "#3b5267"
    },
    alternateTextColor: "#3b5267",
    secondary: {
      main: "#fff"
    },
    bold: {
      main: "red",
      text: "#fff"
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    },
    body2: {
      fontSize: "8pt",
      fontWeight: 100
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

theme = {
  ...theme,
  overrides: {
    shape: {
      [theme.breakpoints.down("xs")]: {
        borderRadius: 0
      }
    },
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c"
      }
    },
    MuiButton: {
      label: {
        textTransform: "none"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1)
      },
      textColor: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.primary.main
      }
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up("xs")]: {
          padding: 0,
          minWidth: 0
        },
        [theme.breakpoints.down("lg")]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0, 0)
    },
    background: "#5284af" /* Old browsers */,
    background: `-moz-linear-gradient(
    top,
    #5284af 0%,
    #5a87ad 100%
  )`,
    background: `-webkit-linear-gradient(
    top,
    #5284af 0%,
    #5a87ad 100%
  )`,
    background: `linear-gradient(
    to bottom,
    #5284af 0%,
    #5a87ad 100%
  )`,
    filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='#5284af', endColorstr='#5a87ad',GradientType=0 )`
  },
  footer: {
    padding: theme.spacing(2),
    background: "#eaeff1"
  }
};

let Main = connect(
  "selectUser",
  "selectRoute",
  ({ user, route }) => {
    return (
      <Content>
        <route.Component />
      </Content>
    );
  }
);

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              onClose={handleDrawerToggle}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header
            showTabs={shouldShowTabs()}
            onDrawerToggle={handleDrawerToggle}
            onTabSelect={(e, value) => setTab(value)}
            tab={tab}
          />
          <main className={classes.main}>
            <Main />
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

function shouldShowTabs() {
  return !window.location.hash.includes("edit");
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Paperbase);
