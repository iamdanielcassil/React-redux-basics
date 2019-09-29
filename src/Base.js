import React, { useEffect } from "react";
import data from "./data";
import WithLoading from "./components/Loading";
import { connect } from "redux-bundler-react";
import Bar from "./components/topBar/Bar";
import "./base.css";

export default connect(
  "selectUser",
  "selectRoute",
  "selectWorking",
  "doSetCurrentSeason",
  "selectQueryObject",
  ({ user, route, working, doSetCurrentSeason, queryObject }) => {
    data.init(user);

    useEffect(() => {
      doSetCurrentSeason(queryObject.seasonId);
    }, [queryObject, doSetCurrentSeason]);
    return (
      <WithLoading>
        <div className="base">
          <Bar />
          <div className="main flex-row">
            <div id="MAIN_MENU_PORTAL" />
            <route.Component />
          </div>
        </div>
      </WithLoading>
    );
  }
);
