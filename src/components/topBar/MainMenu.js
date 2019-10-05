import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./mainMenu.css";

export default props => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    document.body.onclick = e => {
      let claslist = e.target.classList;

      if (!claslist.contains('mainMenu-item') && !claslist.contains('menuToggle')) {
        setIsShowing(false);
      }

      if (claslist.contains('mainMenu')) {
        e.preventDefault();
      }
    }
  }, [setIsShowing])

  return (
    <React.Fragment>
      <MainMenu isShowing={isShowing} setIsShowing={setIsShowing}>{props.children}</MainMenu>
      <nav role="navigation">
        <div className="menuToggle">
          <input
          className="menuToggle"
            type="checkbox"
            value={isShowing}
            onChange={e => {
              // e.preventDefault();
              // e.stopPropagation();
              setIsShowing(!isShowing);
            }}
          />
          <span className={isShowing ? 'active' : ''}/>
          <span className={isShowing ? 'active' : ''}/>
          <span className={isShowing ? 'active' : ''}/>
        </div>
      </nav>
    </React.Fragment>
  );
};

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { adding: false };
    this.child = document.createElement("div");
  }

  componentDidMount() {
    this.target = document.getElementById("MAIN_MENU_PORTAL");
    this.target.appendChild(this.child);
  }

  render() {
    return ReactDOM.createPortal(
      <CSSTransition
        in={this.props.isShowing}
        timeout={300}
        classNames="mainMenu"
      >
        <div className="mainMenu">{this.props.children}</div>
      </CSSTransition>,
      this.child
    );
  }
}
