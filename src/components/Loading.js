import React from "react";
import { connect } from "redux-bundler-react";
import "./loading.css";

export default connect(
  "selectWorking",
  ({ working, children }) => {
    if (working) {
      return (
        <React.Fragment>
          {children}
          <div className="loaderGrid">
            <div className="load-container load3">
              <div className="loader">Loading...</div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return children;
  }
);
