import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "redux-bundler-react";
import createStore from "./bundles/";
import Base from "./Base";
import "./styles.css";

const store = createStore();

window.DC = { store };
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
