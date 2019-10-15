import { createRouteBundle } from "redux-bundler";

import RacesManage from "../pages/RacesManage";
import Stats from "../pages/Stats";
import SeasonsManage from "../pages/SeasonsManage";

import EditRace from "../pages/EditRace";

import BoatsManage from "../pages/BoatsManage";

import ViewSeason from "../pages/ViewSeason";

import EditBoat from "../pages/EditBoat";
import EditSeason from "../pages/EditSeason";
import ViewRace from "../pages/ViewRace";

import ManageRace from "../pages/ManageRace";
import Login from "../pages/Login";

let _onAllRoutesWrapper = (route, Component) => {
  window.DC.debug.log({ [route]: Component });
  return { [route]: { Component } };
};

const routes = {
  ..._onAllRoutesWrapper("", Stats),
  ..._onAllRoutesWrapper("/", Stats),

  ..._onAllRoutesWrapper("/boats", Stats),
  ..._onAllRoutesWrapper("/boats/manage", BoatsManage),
  ..._onAllRoutesWrapper("/boats/stats", Stats),

  ..._onAllRoutesWrapper("/races", Stats),
  ..._onAllRoutesWrapper("/races/manage", RacesManage),
  ..._onAllRoutesWrapper("/races/stats", Stats),

  ..._onAllRoutesWrapper("/seasons", Stats),
  ..._onAllRoutesWrapper("/seasons/manage", SeasonsManage),
  ..._onAllRoutesWrapper("/seasons/stats", Stats),

  ..._onAllRoutesWrapper("/seasons/new", EditSeason),
  ..._onAllRoutesWrapper("/seasons/view", ViewSeason),
  ..._onAllRoutesWrapper("/seasons/:id/edit", EditSeason),

  ..._onAllRoutesWrapper("/races/manage/:id", ManageRace),
  ..._onAllRoutesWrapper("/races/new", EditRace),
  ..._onAllRoutesWrapper("/races/:id", ViewRace),
  ..._onAllRoutesWrapper("/races/:id/edit", EditRace),

  ..._onAllRoutesWrapper("/boats/new", EditBoat),
  ..._onAllRoutesWrapper("/boats/:id", EditBoat),
  ..._onAllRoutesWrapper("/boats/:id/edit", EditBoat),

  ..._onAllRoutesWrapper("/login", Login),
  ..._onAllRoutesWrapper("/afterLogin", Stats)
};

export default createRouteBundle(routes, {
  routeInfoSelector: "selectHash"
});
