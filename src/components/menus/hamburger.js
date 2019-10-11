import React, { useState, useEffect } from "react";
import "./hamburger.css";

export default ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    window.DC.debug.log("!!!! attached doc lister");
    // document.body.addEventListener("click", () => {
    //   window.DC.debug.log("@@@@@@@@@@@@ triggered doc event");
    //   setIsShowing(false);
    // });direct
  }, [setIsShowing]);
  return (
    <div className="hamburger show-hamburger-menu">
      <button
        id="hamburger-btn"
        className="hamburger-btn"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setIsShowing(!isShowing);
        }}
      >
        <span className="hamburger-patty" />
        <span className="hamburger-patty" />
        <span className="hamburger-patty" />
      </button>
      {isShowing ? (
        <div className="hamburger-menu">
          <div className="hamburger-menu-caret">
            <div className="hamburger-menu-caret-outer" />
            <div className="hamburger-menu-caret-inner" />
          </div>
          <div>
            {Object.values(children).map((child, index) => (
              <div
                key={index}
                className="hamburger-menu-item hamburger-menu-btn"
                role="presentation"
              >
                {child}
                {/* <button type="button" className="hamburger-menu-btn" role="menuitem">
                  {child}
                </button> */}
              </div>
            ))}
          </div>

          {/* <ul
            className="hamburger-menu-items"
            tabindex="-1"
            role="menu"
            aria-labelledby="hamburger-btn"
            aria-hidden="true"
          >
            {Object.values(children).map(child => (
              <li className="hamburger-menu-item" role="presentation">
                <button type="button" className="hamburger-menu-btn" role="menuitem">
                  {child}
                </button>
              </li>
            ))}
          </ul> */}
        </div>
      ) : null}
    </div>
  );
};
