import { createRouteBundle } from "redux-bundler";
import Overview from "../pages/Overview";
import ViewSeason from "../pages/ViewSeason";
import EditRace from "../pages/EditRace";
import ManageBoats from "../pages/ManageBoats";
import EditBoat from "../pages/EditBoat";
import EditSeason from "../pages/EditSeason";
import ViewRace from "../pages/ViewRace";
import Login from "../pages/Login";

let _onAllRoutesWrapper = (route, Component) => {
  console.log({ [route]: Component });
  return { [route]: { Component } };
};

const routes = {
  ..._onAllRoutesWrapper("", Overview),
  ..._onAllRoutesWrapper("/", Overview),
  ..._onAllRoutesWrapper("/seasons", Overview),
  ..._onAllRoutesWrapper("/seasons/new", EditSeason),
  ..._onAllRoutesWrapper("/seasons/:id", ViewSeason),
  ..._onAllRoutesWrapper("/seasons/:id/edit", EditSeason),
  ..._onAllRoutesWrapper("/races/new", EditRace),
  ..._onAllRoutesWrapper("/races/:id", ViewRace),
  ..._onAllRoutesWrapper("/races/:id/edit", EditRace),
  ..._onAllRoutesWrapper("/boats", ManageBoats),
  ..._onAllRoutesWrapper("/boats/new", EditBoat),
  ..._onAllRoutesWrapper("/boats/:id", EditBoat),
  ..._onAllRoutesWrapper("/boats/:id/edit", EditBoat),
  ..._onAllRoutesWrapper("/login", Login),
  ..._onAllRoutesWrapper("/afterLogin", Overview)
};

export default createRouteBundle(routes, {
  routeInfoSelector: "selectHash"
});
