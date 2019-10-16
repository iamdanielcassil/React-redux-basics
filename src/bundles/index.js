import {
  composeBundlesRaw,
  createUrlBundle,
  createDebugBundle,
} from "redux-bundler";
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
