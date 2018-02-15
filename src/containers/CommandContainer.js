import React, {Component} from "react";

import CommandLine from "../components/CommandLine";
import {connect} from "react-redux";

class CommandContainer extends Component {
  render() {
    return (
      <div className="command-container">
        <CommandLine value={this.props.value}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    value: state.input.get("value"),
  };
}

const connected = connect(mapStateToProps)(CommandContainer);

export default connected;