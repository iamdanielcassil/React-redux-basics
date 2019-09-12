import { combineReducers } from "redux";
import base from "./base";
import router from "./router";
import user from "./user";
import working from "./working";

export default combineReducers({
  // base,
  router,
  user,
  working
});
