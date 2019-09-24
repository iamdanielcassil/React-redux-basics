import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

export default class RaceEntries extends React.Component {
  constructor(props) {
    super(props);

    this.state = { adding: false };
    this.child = document.createElement("div");
  }

  componentDidMount() {
    this.modal = document.getElementById("MODAL_PORTAL");
    this.modal.appendChild(this.child);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal">{this.props.children}</div>
      </div>,
      this.child
    );
  }
}
