import {
  composeBundlesRaw,
  createUrlBundle,
  createDebugBundle,
  applyMiddleware
} from "redux-bundler";
import logger from "../middleware/test";
import user from "./user";
import states from "./states";
import routes from "./routes";
import races from "./races";
import results from "./results";
import seasons from "./seasons";
import boats from "./boats";

export default composeBundlesRaw(
  createUrlBundle(),
  createDebugBundle(),
  user,
  boats,
  states,
  routes,
  races,
  results,
  seasons
);
