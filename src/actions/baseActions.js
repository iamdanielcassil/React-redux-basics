import store from "../store";

export default {
  init: payload => {
    window.setTimeout(() => {
      store.dispatch({
        type: "INIT_FINISHED",
        payload: { loading: false }
      });
    }, 1500);
    return {
      type: "INIT_STARTED",
      payload: { loading: true }
    };
  },
  initAlso: payload => {
    window.setTimeout(() => {
      store.dispatch({
        type: "INIT_MORE_FINISHED",
        payload: { more: { loading: false } }
      });
    }, 5000);
    return {
      type: "INIT_MORE_STARTED",
      payload: { more: { loading: true } }
    };
  }
};
