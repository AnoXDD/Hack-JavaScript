import React, {Component} from "react";

import CommandLine from "../components/CommandLine";
import {connect} from "react-redux";

class OutputContainer extends Component {
  render() {
    return (
      <div className="output-container">
        {this.props.output}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    output: state.interface.get("output"),
  };
}

const connected = connect(mapStateToProps)(OutputContainer);

export default connected;