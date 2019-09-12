import Data from "../data";
import store from "../store";

let data = null;

store.subscribe(() => {
  let user = store.getState().user;

  if (user && user.payload && !data) {
    data = new Data(user.payload);
  } else if (!user || !user.payload) {
    data = null;
  }
});

export default {
  data,
  getUserQuery: query => {
    // store.dispatch({ type: "USER_QUERY_STARTED", working: true });
    // return data.getUserQuery();
  }
};
