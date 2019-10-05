import React from "react";
import { connect } from "redux-bundler-react";
import './boats.css';

export default connect(({}) => {
  return <div className="boats"><span/><ul className="list">
      <li className="list-item">
        <span>Boat</span>
        <span>Owner</span>
        <span />
        <span>Points</span>
        <span>Rank</span>
      </li>
    </ul><ul className="list">
      <li className="list-item">
        <span>Boat</span>
        <span>Owner</span>
        <span />
        <span>Points</span>
        <span>Rank</span>
      </li>
    </ul></div>;
});
