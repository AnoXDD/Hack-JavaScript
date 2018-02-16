import React, {Component} from "react";

import CommandLine from "../components/CommandLine";
import {connect} from "react-redux";

class CommandContainer extends Component {
  render() {
    return (
      <div className="command-container">
        <CommandLine
          value={this.props.value}
          header={this.props.header}
          password={this.props.password}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    value   : state.input.get("value"),
    header  : state.output.get("interface")
      .get("property")
      .get("header"),
    password: state.output.get("interface")
      .get("property")
      .get("password"),
  };
}

const connected = connect(mapStateToProps)(CommandContainer);

export default connected;