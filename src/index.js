import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "redux-bundler-react";
import createStore from "./bundles/";
import Base from "./Base";
import "./styles.css";

const store = createStore();

window.DC = window.DC ? { ...window.DC, store } : { store };
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
