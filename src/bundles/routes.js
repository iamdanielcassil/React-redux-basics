import { createRouteBundle } from "redux-bundler";
import Overview from "../pages/Overview";
import Test from "../pages/TestRoute";
import Login from "../pages/Login";

const routes = {
  "": { Component: Overview },
  "/": { Component: Overview },
  test: { Component: Test },
  login: { Component: Login },
  afterLogin: { Component: Overview }
};

export default createRouteBundle(routes, {
  routeInfoSelector: "selectHash"
});
