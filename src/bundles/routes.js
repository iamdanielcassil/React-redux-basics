import { createRouteBundle } from "redux-bundler";

import RacesManage from "../pages/RacesManage";
import RaceEvent from "../pages/RaceEvent";
import RaceEdit from "../pages/RaceEdit";

import SeasonsManage from "../pages/SeasonsManage";
import SeasonEdit from "../pages/SeasonEdit";

import BoatsManage from "../pages/BoatsManage";
import BoatEdit from "../pages/BoatEdit";

import Stats from "../pages/Stats";

import Login from "../pages/Login";

let _onAllRoutesWrapper = (route, Component) => {
  window.DC.debug.log({ [route]: Component });
  return { [route]: { Component } };
};

const routes = {
  ..._onAllRoutesWrapper("", Stats),
  ..._onAllRoutesWrapper("/", Stats),

  ..._onAllRoutesWrapper("/boats/manage", BoatsManage),
  ..._onAllRoutesWrapper("/boats/stats", Stats),
  ..._onAllRoutesWrapper("/boats/new", BoatEdit),
  ..._onAllRoutesWrapper("/boats/:id/edit", BoatEdit),

  ..._onAllRoutesWrapper("/races/manage", RacesManage),
  ..._onAllRoutesWrapper("/races/stats", Stats),
  ..._onAllRoutesWrapper("/races/new", RaceEdit),
  ..._onAllRoutesWrapper("/races/manage/:id", RaceEvent),
  ..._onAllRoutesWrapper("/races/:id/edit", RaceEdit),

  ..._onAllRoutesWrapper("/seasons/manage", SeasonsManage),
  ..._onAllRoutesWrapper("/seasons/stats", Stats),
  ..._onAllRoutesWrapper("/seasons/:id/edit", SeasonEdit),
  ..._onAllRoutesWrapper("/seasons/new", SeasonEdit),
 
  ..._onAllRoutesWrapper("/login", Login),
  ..._onAllRoutesWrapper("/afterLogin", Stats)
};

export default createRouteBundle(routes, {
  routeInfoSelector: "selectHash"
});
