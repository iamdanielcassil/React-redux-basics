import React, { useEffect } from "react";
import data from "./data";
import WithLoading from "./components/Loading";
import { connect } from "redux-bundler-react";
import Bar from "./components/topBar/Bar";
import "./base.css";

export default connect(
  "selectUser",
  "selectRoute",
  ({ user, route }) => {
    data.init(user);

    return (
      <WithLoading>
        <div className="base">
          <Bar />
          <div className="main flex-row">
            <div id="MAIN_MENU_PORTAL" className="main-menu-portal" />
            <route.Component />
          </div>
        </div>
      </WithLoading>
    );
  }
);
