import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/";
import middleware from "./middleware/debugMiddleware";

let store = createStore(reducers, applyMiddleware(middleware));
export default store;
