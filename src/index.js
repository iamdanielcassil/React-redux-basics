import React from "react";
import ReactDOM from "react-dom";
import { debug } from "./foundations/notifications";
import { Provider } from "redux-bundler-react";
import createStore from "./bundles/";
import Base from "./Base";
// import Base from "./material/Base";
import "./styles.css";

const store = createStore();

window.DC = window.DC ? { ...window.DC, store, debug } : { store, debug };
function App() {
  return (
    <div className="App">
      <div id="MODAL_PORTAL" className="modal-portal" />
      <Base />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <Base />
  </Provider>,
  rootElement
);
