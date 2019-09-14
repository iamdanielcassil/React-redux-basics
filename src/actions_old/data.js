// import Data from "../data";
// import store from "../store";

let data = null;

store.subscribe(() => {
  let user = store.getState().user;

  console.log("data init", user);
  if (user && !data) {
    data = new Data(user);
  } else if (!user || !user) {
    data = null;
  }
});

export default {
  data,
  getUserQuery: query => {
    store.dispatch({ type: "USER_QUERY_STARTED", working: true });

    let q = data.getUserQuery();

    store.dispatch({ type: "USER_QUERY_FINISHEDD", working: false });
    return q;
  }
};
