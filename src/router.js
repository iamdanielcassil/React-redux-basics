import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Base from "./components/Base";
import store from "./store";
import "./styles.css";

const init = () => {
  window.addEventListener("popstate", () => {
    store.dispatch(updateUrl(window.location.pathname));
  });

  store.subscribe(() => {
    const { pathname } = store.getState().routing;
    if (window.location.pathname !== pathname) {
      window.history.pushState(null, "", pathname);
      // Force scroll to top this is what browsers normally do when
      // navigating by clicking a link.
      // Without this, scroll stays wherever it was which can be quite odd.
      document.body.scrollTop = 0;
    }
  });
};

export const updateUrl = url => {
  return {
    type: "UPDATE_URL",
    payload: url
  };
};

init();
