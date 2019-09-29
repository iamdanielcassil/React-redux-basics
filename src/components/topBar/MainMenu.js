import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./mainMenu.css";

export default props => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <React.Fragment>
      <MainMenu isShowing={isShowing} />
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
