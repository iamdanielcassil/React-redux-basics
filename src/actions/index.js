import base from "./baseActions";
import { log } from "./debugAction";
import store from "../store";

const _actions = {
  ...base,
  log
};

const actions = (type, payload) => {
  let action = _actions[type];

  if (typeof action === "function") {
    return action(payload);
  }

  return log(
    type,
    `Could not find action { ${type} } in list of known actions { ${Object.keys(
      _actions
    )} }`
  );
};

let bound = () => {
  let boundActions = {};

  Object.keys(_actions).forEach(key => {
    boundActions[key] = payload => store.dispatch(actions(key, payload));
  });

  return boundActions;
};

export const boundActions = bound();
export default actions;
