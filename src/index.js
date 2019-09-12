import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Base from "./components/Base";
import store from "./store";
import "./actions/user";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Base />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
