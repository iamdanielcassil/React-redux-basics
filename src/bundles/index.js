import { composeBundlesRaw, createUrlBundle } from "redux-bundler";
import user from "./user";
import states from "./states";
import routes from "./routes";
import races from "./races";
import seasons from "./seasons";

export default composeBundlesRaw(
  createUrlBundle(),
  user,
  states,
  routes,
  races,
  seasons
);
