import React, { useState, useEffect } from "react";
import "./more.css";

export default ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    console.log("!!!! attached doc lister");
    // document.body.addEventListener("click", () => {
    //   console.log("@@@@@@@@@@@@ triggered doc event");
    //   setIsShowing(false);
    // });direct
  }, [setIsShowing]);
  return (
    <div className="more show-more-menu">
      <button
        id="more-btn"
        className="more-btn"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setIsShowing(!isShowing);
        }}
      >
        <span className="more-dot" />
        <span className="more-dot" />
        <span className="more-dot" />
      </button>
      {isShowing ? (
        <div className="more-menu">
          <div className="more-menu-caret">
            <div className="more-menu-caret-outer" />
            <div className="more-menu-caret-inner" />
          </div>
          <div>
            {Object.values(children).map((child, index) => (
              <div
                key={index}
                className="more-menu-item more-menu-btn"
                role="presentation"
              >
                {child}
                {/* <button type="button" className="more-menu-btn" role="menuitem">
                  {child}
                </button> */}
              </div>
            ))}
          </div>

          {/* <ul
            className="more-menu-items"
            tabindex="-1"
            role="menu"
            aria-labelledby="more-btn"
            aria-hidden="true"
          >
            {Object.values(children).map(child => (
              <li className="more-menu-item" role="presentation">
                <button type="button" className="more-menu-btn" role="menuitem">
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
