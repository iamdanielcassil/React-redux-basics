import React from "react";
import data from "./data";
import WithLoading from "./components/Loading";
import { connect } from "redux-bundler-react";
import Bar from "./components/Bar";
import "./base.css";

export default connect(
  "selectUser",
  "selectRoute",
  "selectWorking",
  ({ user, route, working }) => {
    console.log("base comp", route, user, working, window.location.hash);
    if (user) {
      data.init(user);
    }
    return (
      <WithLoading>
        <div className="base">
          <Bar />
          <route.Component />
        </div>
      </WithLoading>
    );
  }
);
