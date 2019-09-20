import React from "react";
import data from "./data";
import WithLoading from "./components/Loading";
import { connect } from "redux-bundler-react";
import Bar from "./components/topBar/Bar";
import "./base.css";

export default connect(
  "selectUser",
  "selectRoute",
  "selectWorking",
  ({ user, route, working }) => {
    console.log("base comp", route, user, working, window.location.hash);
    data.init(user);
    console.log("base hit,", route);
    return (
      <WithLoading>
        <div className="base">
          <div id="MODAL_PORTAL" />
          <Bar />
          <route.Component />
        </div>
      </WithLoading>
    );
  }
);
