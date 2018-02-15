import React, {Component} from "react";
import {connect} from "react-redux";

import store from "../store";
import {
  type, backspace, send, prevCommand,
  nextCommand
} from "../enum/Action";

class ControlContainer extends Component {

  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    window.addEventListener("keydown", this.handleKeyDown, true);
  }

  componentWillUnmount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    let {key} = e;

    // todo control-c delete
    if (key.length === 1) {
      store.dispatch(type(key));
    } else if (key === "Backspace") {
      store.dispatch(backspace(e.ctrlKey));
    } else if (key === "Enter") {
      store.dispatch(send());
    } else if (key === "ArrowUp") {
      store.dispatch(prevCommand());
    } else if (key === "ArrowDown") {
      store.dispatch(nextCommand());
    } else {
      console.log("keydown", key);
    }

    return false;
  }

  render() {
    return null;
  }
}

const connected = connect()(ControlContainer);

export default connected;