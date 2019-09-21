import React, { useState } from "react";
import "./more.css";

export default ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  // var el = document.querySelector(".more");
  // var btn = el.querySelector(".more-btn");
  // var menu = el.querySelector(".more-menu");
  // var visible = false;

  // function showMenu(e) {
  //   e.preventDefault();
  //   if (!visible) {
  //     visible = true;
  //     el.classList.add("show-more-menu");
  //     menu.setAttribute("aria-hidden", false);
  //     document.addEventListener("mousedown", hideMenu, false);
  //   }
  // }

  // function hideMenu(e) {
  //   if (btn.contains(e.target)) {
  //     return;
  //   }
  //   if (visible) {
  //     visible = false;
  //     el.classList.remove("show-more-menu");
  //     menu.setAttribute("aria-hidden", true);
  //     document.removeEventListener("mousedown", hideMenu);
  //   }
  // }

  // btn.addEventListener("click", showMenu, false);
  return (
    <div className="more show-more-menu">
      <button
        id="more-btn"
        className="more-btn"
        onClick={() => setIsShowing(!isShowing)}
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
          <ul
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
            <li className="more-menu-item" role="presentation">
              <button type="button" className="more-menu-btn" role="menuitem">
                Share
              </button>
            </li>
            <li className="more-menu-item" role="presentation">
              <button type="button" className="more-menu-btn" role="menuitem">
                Copy
              </button>
            </li>
            <li className="more-menu-item" role="presentation">
              <button type="button" className="more-menu-btn" role="menuitem">
                Embed
              </button>
            </li>
            <li className="more-menu-item" role="presentation">
              <button type="button" className="more-menu-btn" role="menuitem">
                Block
              </button>
            </li>
            <li className="more-menu-item" role="presentation">
              <button type="button" className="more-menu-btn" role="menuitem">
                Report
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};
