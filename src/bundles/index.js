import { composeBundlesRaw, createUrlBundle } from "redux-bundler";
import user from "./user";
import states from "./states";
import routes from "./routes";
import races from "./races";
import raceEntries from "./raceEntries";
import seasons from "./seasons";
import boats from './boats'

export default composeBundlesRaw(
  createUrlBundle(),
  user,
  boats,
  states,
  routes,
  races,
  raceEntries,
  seasons
);
